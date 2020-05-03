---
date        : '2020-05-03T12:00:00.000Z'
title       : 'How-to: Setting auto-generated Ids manually in Hibernate'
description : 'In this tutorial, you will learn how to implement a custom IdentifierGenerator to support auto-generated and manually assigned Ids using Hibernate.'
path        : '/setting-auto-generated-ids-manually-in-hibernate/'
tags        : 'Hibernate, How-to'
---

In this tutorial, you will learn how to implement a custom `IdentifierGenerator` to support auto-generated and manually assigned Ids using Hibernate.

![Alfredo Jaar - ¿Es usted feliz?, Tate Modern London © matchilling](./alfredo-jaar-es-usted-feliz.jpg 'Alfredo Jaar - ¿Es usted feliz?, Tate Modern London © matchilling')
*Alfredo Jaar - ¿Es usted feliz?, Tate Modern London © [matchilling](https://www.instagram.com/p/B_af_AZpQo3/)*

When it comes to picking the right id generation strategy for your technical keys, you have primarily two major choices in Hibernate.

- Use auto-generated values and let Hibernate or the underlying database engine generate those identifiers for you, or
- Generate all ids yourself with the help of the [`Assigned` class](https://docs.jboss.org/hibernate/orm/current/javadocs/org/hibernate/id/Assigned.html).

However, a third approach which is a mixture of both foresaid strategies is not supported out-of-the-box by Hibernate.

In some scenarios, it might be helpful to let Hibernate or the underlying database engine generate keys most of the time, but also support manual assignments.

## Custom IdentifierGenerator

To have the best of both worlds, we only have to provide our own implementation of the [`IdentifierGenerator` interface](https://docs.jboss.org/hibernate/orm/current/javadocs/org/hibernate/id/IdentifierGenerator.html), which specifies two methods, `generate` and `supportsJdbcBatchInserts`.

Here is an example implementation in Kotlin:

```kotlin
package com.matchilling.lib.hibernate

import org.hibernate.engine.spi.SharedSessionContractImplementor
import org.hibernate.id.IdentifierGenerator
import java.io.Serializable
import java.util.*
import kotlin.reflect.full.declaredMemberProperties
import kotlin.reflect.jvm.javaType

class UuidGenerator : IdentifierGenerator {

    override fun generate(
            session: SharedSessionContractImplementor?,
            instance: Any?
    ): Serializable {
        val id = instance!!::class.declaredMemberProperties.find {
            it.name == "id" && it.returnType.javaType.typeName == UUID::class.java.canonicalName
        }?.getter?.call(instance)

        return if (id != null) {
            id as UUID
        } else {
            UUID.randomUUID()
        }
    }

    companion object {
        const val NAME = "uuid"
        const val STRATEGY = "com.matchilling.lib.hibernate.UuidGenerator"
    }
}
```

## Usage

With the new `UuidGenerator` class in place, we can now annotate our entity class accordingly and start using the generator.

```kotlin
@Entity
data class Person(

        @GeneratedValue(generator = UuidGenerator.NAME)
        @GenericGenerator(
            name = UuidGenerator.NAME,
            strategy = UuidGenerator.STRATEGY
        )
        @Id
        val id: UUID?
)
```

I hope you find this tutorial useful. The implementation of the shown example, as well as the companion unit tests, can be found on [GitHub](https://gist.github.com/matchilling/7ff2a0cdb23b9f205d291b65342a99da).
