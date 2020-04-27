---
date  : '2020-04-27T19:00:00.000Z'
title : 'RESTful pagination in Spring using Link header'
path  : '/restful-pagination-in-spring-using-link-header/'
tags  : 'Spring, How-to, REST'
---

Pagination is a mechanism for managing big result sets in any application. This quick tutorial focuses on implementing pagination in a RESTful API, using Spring MVC :leaves: and Spring Data without the help of the Spring HATEOAS project.

![A completely unrelated photo - Peratallada, Baix Empordà © matchilling](./peratallada.jpg 'A completely unrelated photo - Peratallada, Baix Empordà © matchilling')
*A completely unrelated photo - Peratallada, Baix Empordà © [matchilling](https://www.instagram.com/p/B1x4Tu-Jkwt/)*

## Quick Introduction

Additionally, to increasing throughput and evolving your API design, paginating APIs can help with scaling. Quite often, APIs need to handle large datasets, and an API call might end up fetching thousands of items. Returning too many records can oppress the backend and even slow down clients that can't handle large datasets. For that purpose, it's crucial to paginate large result sets and split them into smaller chunks to minimise response times and make the response more comfortable to consume.

Enough for the introduction part, let's get back to Spring.

## Why not just using Spring HATEOAS?

Don't get me wrong, [Spring HATEOAS](https://spring.io/projects/spring-hateoas) is an excellent tool and provides some nice APIs to ease creating REST representations that follow the HATEOAS principle. However, it certainly comes with some implementation overhead on the client- and server-side, or it sometimes just doesn't fit into your existing API design.

My use case was an MVP which serialises and exposes the domain entities directly via a restful interface without using dedicated data transfer objects. Yes, a [recommended strategy](https://stackoverflow.com/questions/36174516/rest-api-dtos-or-not) is to use DTOs, but I usually tend to keep it simple at the beginning and only introduce this additional abstraction layer when necessary.

## Example endpoint

Rather than just returning a simple list, I want my endpoint to support sorting, ordering and as the title says, pagination. Therefore, let's consider the following REST endpoint, which returns a paginated response of my domain entities by leveraging the [Pageable interface](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Pageable.html).

```kotlin
@Operation(summary = "List currencies", tags = ["currency"])
@ResponseBody
@RequestMapping(
        headers = ["$ACCEPT=$APPLICATION_JSON_VALUE"],
        method = [RequestMethod.GET],
        produces = [APPLICATION_JSON_VALUE]
)
fun page(pageable: Pageable): Page<Currency> {
    return repository.findAll(pageable)
}

```

By default, Spring serialises the PageImpl object which implements the Pageable interface as follows:

```json
{
  "content": [{
      "code": "AUD",
      "name": "Australian dollar"
  }],
  "pageable": {},
  "sort": {},
  "totalPages": 99,
  ...
}
```

In comparison to a simple list, we can observe that the returned JSON structure contains additional fields derived from the PageImpl object such as pageable, sort, totalPages etc. and that our resource list is wrapped in the content property.

### Custom PageSerializer

Most of the time, these additional properties are already known by the consumer when they build the request, so I find it a bit redundant to include them in the response body again.  I prefer to have just a resource, or a list of resources returned from the API, and hence the page object is not part of the domain I don't think it should form part of the response. But that is just personal taste. However, to change the serialisation of the object PageImpl, we need to create a custom PageSerializer class like the one below:

```kotlin
@JsonComponent
class PageSerializer : JsonSerializer<PageImpl<*>>() {

    @Throws(IOException::class)
    override fun serialize(
            page: PageImpl<*>,
            jsonGenerator: JsonGenerator,
            serializerProvider: SerializerProvider
    ) {
        jsonGenerator.writeObject(page.content)
    }
}
```

With the custom PageSerializer in place, our new response looks like this now:

```json
[{
  "code": "AUD",
  "name": "Australian dollar"
}]
```

## But how do I know if there are more pages?

As an alternative to including pagination related information in the body, we are going to use the [Link header](http://tools.ietf.org/html/rfc5988) coupled with the "next", "prev", "first" and "last" link relation types. The HTTP Link entity-header field provides a means for serialising one or more links in HTTP headers. It is semantically equivalent to the [HTML link element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link), and the syntax looks like this:

```textfile
Link: < uri-reference >; param1=value1; param2="value2"
```

In our currency use case, we would like to let the API consumer know where to find the next and the last page on the server. An example header should look something like this:

```textfile
Link: <http://localhost:8080/currency?page=2&size=25>; rel="next",<http://localhost:8080/currency?page=4&size=25>; rel="last"
```

## Custom PaginatedResponseAdvice

Fortunately, Spring provides us with the handy ResponseBodyAdvice interface, which allows us to manipulate the response before it's being sent to the client.

We implement the ResponseAdvice interface by overriding the `supports` and `beforeBodyWrite` method which gives us access to the response body, the PageImpl instance in our case, and the ServerHttpResponse object to which we want to append our Link header.

Let's start implementing the `supports` method:

```kotlin
@RestControllerAdvice
class PaginatedResponseAdvice<T> : ResponseBodyAdvice<T> {

  override fun supports(
          returnType: MethodParameter,
          converterType: Class<out HttpMessageConverter<*>>
  ): Boolean {
      return PageImpl::class.java.isAssignableFrom(returnType.parameterType)
  }
}
```

As we can see in the above code, the only pupose of the `supports` method is to indicate if the component supports the given controller method return type. Note as well, that we are using the `RestControllerAdvice` annotation on our class to intercept the response before sending it to back the client.

Let's move on to the `beforeBodyWrite` method:

```kotlin
@RestControllerAdvice
class PaginatedResponseAdvice<T>(
        @Value("\${spring.data.web.pageable.one-indexed-parameters}")
        private val oneIndexed: Boolean
) : ResponseBodyAdvice<T> {

  override fun beforeBodyWrite(
          page: T?,
          returnType: MethodParameter,
          selectedContentType: MediaType,
          selectedConverterType: Class<out HttpMessageConverter<*>>,
          request: ServerHttpRequest,
          response: ServerHttpResponse
  ): T? {
      if (page !is PageImpl<*>) {
          return page
      }

      val headers = response.headers
      headers.set(
              "Access-Control-Expose-Headers",
              "Link,Page-Number,Page-Size,Total-Elements,Total-Pages"
      )

      val links = page.links(request)
      if (links.isNotBlank()) {
          headers.set("Link", links)
      }

      val pageNumber = if (oneIndexed)
          page.number.plus(1)
      else
          page.number

      headers.set("Page-Number", pageNumber.toString())
      headers.set("Page-Size", page.size.toString())
      headers.set("Total-Elements", page.totalElements.toString())
      headers.set("Total-Pages", page.totalPages.toString())

      return page
  }
}
```

Let's quickly cover a few essential points in the above code:

- As a page in Spring data can be [one-indexed](https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html#data-properties), meaning a page number of zero in the request equals the first page we need this piece of information to adapt our links pointing to the next, last etc. pages accordingly. Fortunately, the [Spring Value annotation](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Value.html) makes it easy to inject the value through the class constructor.
- To expose our new Link header to the browser, we set the [Access-Control-Expose-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers) to whitelist them.
- Furthermore, we enable the client to display the page number, size, total elements and total pages by adding them as additional headers.

**But how are the links being created?**

So far we have only seen a call to the `links` method which returns a string. Next, we take a look at how the links are being created:

```kotlin
@RestControllerAdvice
class PaginatedResponseAdvice<T>(
        @Value("\${spring.data.web.pageable.one-indexed-parameters}")
        private val oneIndexed: Boolean
) : ResponseBodyAdvice<T> {

    override fun supports(
            returnType: MethodParameter,
            converterType: Class<out HttpMessageConverter<*>>
    ): Boolean {...}

    override fun beforeBodyWrite(
            page: T?,
            returnType: MethodParameter,
            selectedContentType: MediaType,
            selectedConverterType: Class<out HttpMessageConverter<*>>,
            request: ServerHttpRequest,
            response: ServerHttpResponse
    ): T? {...}

    private fun PageImpl<*>.links(request: ServerHttpRequest): String {
        val links = mutableListOf<String>()
        val builder = UriComponentsBuilder.fromUri(request.uri)
        if (request.uri.host == "localhost") {
            builder.port(request.uri.port)
        }

        if (!this.isFirst) {
            val link = builder.replacePageAndSize(this.pageable.first())
            links.add("<${link.toUriString()}>; rel=\"first\"")
        }

        if (this.hasPrevious()) {
            val link = builder.replacePageAndSize(this.previousPageable())
            links.add("<${link.toUriString()}>; rel=\"prev\"")
        }

        if (this.hasNext()) {
            val link = builder.replacePageAndSize(this.nextPageable())
            links.add("<${link.toUriString()}>; rel=\"next\"")
        }

        if (!this.isLast) {
            val last = builder.cloneBuilder()
            last.replaceQueryParam("page", this.totalPages)
            last.replaceQueryParam("size", this.size)

            links.add("<${last.toUriString()}>; rel=\"last\"")
        }

        return links.joinToString(",")
    }

    private fun UriComponentsBuilder.replacePageAndSize(
            page: Pageable
    ): UriComponentsBuilder {
        val builder = this.cloneBuilder()

        val pageNumber = if (oneIndexed)
            page.pageNumber.plus(1)
        else
            page.pageNumber
        builder.replaceQueryParam("page", pageNumber)
        builder.replaceQueryParam("size", page.pageSize)

        return builder
    }
}
```

This is actually the boring bit, as nothing exciting is going on here. We just define two [extension functions](https://kotlinlang.org/docs/reference/extensions.html) on the PageImpl and UriComponentsBuilder classes to idiomatically create the required link relations, join them together with a comma and that's it!

:clap: :clap: :clap:

## Summary & Best Practices

In this tutorial, we learned how to implement RESTful pagination in Spring, discussed how to structure the API response and the importance of using the Link HTTP header.

Finally, here are some **best practices** (which I may update over time) one should keep in mind when designing pagination for an API:
- Always set reasonable default and maximum values for the page size.
- This holds for sorting as well. Sorting the response such that newer items are returned first and older ones later, is often more performant. This way, clients don't need to paginate through to the end if they are interested only in newer items.
- If your API does not support pagination today, introduce it later in a way that maintains backward compatibility (hint: the previously implementation follows that principle).
- Return the next page URL pointing to the subsequent page of results. By encouraging clients to fetch the next page URL, over time, you can change your pagination strategy without breaking clients.

*The implementation of the shown examples and code snippets can be found on [GitHub](https://gist.github.com/matchilling/07ba65800a3b0770b7a52d0d868d0f0b).*
