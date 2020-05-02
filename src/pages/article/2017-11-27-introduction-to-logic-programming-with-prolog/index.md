---
date        : '2017-11-27T02:57:06.422Z'
hn_id       : 15850874
title       : 'Introduction to logic programming with Prolog'
description : 'Short introduction to the Prolog language and its essential features.'
path        : '/introduction-to-logic-programming-with-prolog/'
tags        : 'Programming Language Paradigms, Prolog, Logic Programming'
---

![The Great Wave off Kanagawa by Katsushika Hokusai](./the_great_wave_by_hokusai.jpg 'The Great Wave off Kanagawa by Katsushika Hokusai')

I am a language addict ~ I love learning new languages, spoken ones and those you can do funny things with on a computer. As part of an MSc degree, I have picked the "[Programming Paradigms and Languages](https://www.dcs.bbk.ac.uk/study/modules/programming-paradigms-and-languages/)" module offered by Birkbeck University of London, and nicely delivered by Keith Mannock and Trevor Fenner. The aim of the module was to enable students to understand the fundamental differences between various [programming paradigms](http://cs.lmu.edu/~ray/notes/paradigms/) and the applicability of these paradigms to different programming problems.

This module was the reason why I fell in love with [Prolog](https://en.wikipedia.org/wiki/Prolog), a logic programming language heavily used in computational linguistics and artificial intelligence in general.

In this post, I am going to provide a short introduction to the language and its essential features. After reading the post, you should be able to write simple programs in Prolog and understand the language's underlying primary principles.

## Installation

First things first, let us get a working Prolog installation to begin with. As far as this blog post is concerned I am going to use SWI-Prolog (Version 7.2.3), please be aware that Prolog dialects may vary. MacOS and Windows user can download executables [here](http://www.swi-prolog.org/download/stable). On Ubuntu or any other Debian-based distribution, you can use `apt-get`.

```bash
sudo apt-get update && \
sudo apt-get install swi-prolog
```
Alternatively, you can also use the official :whale: [docker image](https://hub.docker.com/_/swipl/).
```bash
docker run -it swipl:stable
# or for the most recent version use the latest tag
docker run -it swipl:latest
```

Now that we have the stage set let us dive into Prolog. However, before it gets technical whats the motivation behind it?

## Motivation to learn Prolog (or any other language)

Why should you even bother to learn Prolog at all? Well, there are a couple of reasons, but at this point, I instead like to refer to "The Pragmatic Programmer"[^1].

*Tip #8 "Invest Regularly in Your Knowledge Portfolio":*
> Learn at least one new language every year. Different languages solve the same problems in different ways. By learning several different approaches, you can help broaden your thinking and avoid getting stuck in a rut. Additionally, learning many languages is far easier now, thanks to the wealth of freely available software on the Internet.

Having said that, try to solve a Sudoku puzzle for example in Java or C ~ in Prolog you can do that in few lines of code.

Cool eh, I can sense that you are getting excited :see_no_evil:.

However, before we dive into Prolog let's lay down the base for any further considerations. To start with, what is "Logical programming"?

## Logical programming

> Say what you want, not how you want it done.

Logical programming is a programming paradigm which has its foundations in mathematical logic. In contrast to languages like Java or C, programs written in a logic programming languages such as Prolog are not composed of sequences of instructions but of a set of axioms, or rules which define relationships between objects. They also follow a declarative rather than an imperative approach. However, what does that mean?

### Imperative vs declarative programming

Let us consider the "coffee-order" metaphor to make sure we are on the same page. Imagine you walk into your favourite coffee place and that you like to order some coffee :coffee:.

**The imperative approach:**
  1. Enter the coffee shop
  2. Queue in the line and wait for the barista asking you for your order
  3. Order
  4. Yes, for takeaway, please
  5. Pay
  6. Present your loyalty card to collect points
  7. Take your order and walk out

**The declarative approach:**
  1. A large latte for takeaway, please

So rather than providing a step by step instruction to archive x or y (imperative), you tell the system what you need and let it try to come up with a solution (declarative).

## About Prolog

Prolog is based on *Horn clauses* (a subset of first-order logic) and it is probably the most famous language in the logic programming family. It was a collaborative project by Alain Colmerauer, Phillipe Roussel (both University of Aix-Marseille) and Robert Kowalski (University of Edinburgh) and has been around for quite a while. Its first version appeared, like Smalltalk and C, in 1972. The name is an abbreviation for "Programmation en logique" (French for programming in logic).

Prolog has been enormously influential in the domains of theorem proving, expert systems, natural language processing and in the field of artificial intelligence (notably IBM’s Watson[^2]) in general. It also significantly influenced the development of [Erlang programming language](https://www.erlang.org).

## Language Constructs

One thing in particular which appealed to me is its ridiculous simple execution model. Prolog has four building block, *logical or*, *logical and*, *term rewriting* and *unification*. By combining these four blocks, we can perform any computation we care about.

Prolog, like SQL, has two main aspects, one to express the data and another to query it. The basic constructs of logic programming, terms and statements, are inherited from logic. There are three basic statements:

- **Facts** are fundamental assertions about the problem domain (e.g. "Socrates is a man")
- **Rules** are inferences about facts in the domain (e.g. "All men are mortal.")
- **Queries** are questions about that domain (e.g. "Is Socrates mortal?")

Facts and rules are stored in a knowledge base, which the Prolog compiler transpiles into a form which is more efficient to query against. When we "ask" a question, Prolog does an exhaustive search through the "database" of facts and rules until it finds a result, using [backtracking](https://www.cis.upenn.edu/~matuszek/cit594-2012/Pages/backtracking.html) internally.

## Basic facts and queries

Prolog has a straightforward syntax. You will pick up the few rules very quickly. Let us transform the Socrates example from earlier into an actual Prolog program and analyse what is happing inside the compiler.

```prolog
man(socrates).
mortal(X) :- man(X).

?- mortal(socrates).
```

The first line reads as "Socrates is a man", it is a base clause, which represents a simple fact. The second line is a rule and translates to, "X is mortal if X is a man" or, "All men are mortal." This rule is for determining when its input X is  "mortal". Rules are a key concept of the language and allow us to make general statements about objects and their relationships. They consist of a head and a body connected by the turnstile symbol `:-` (pronounced "if"). The third line reads as "Is Socrates mortal?", the `?-` is the Prolog prompt for a question.

If you have read those three lines of code thoughtfully, you may have observed the case-sensitivity. In contrast to most other languages capitalisation matters in Prolog. Strings starting with a lowercase character are immutable and called *atoms*, you can compare them with the symbol type in Ruby. Strings starting with an uppercase character or an underscore are variables and can change their value. In our example `socrates` is an atom and the uppercase `X` a variable. Also, note that the full stop after each clause is mandatory.

Let us ask Prolog another question using our previously defined knowledge base.

```prolog
?- mortal(plato).
```

Prolog will, of course, respond `false`, because we do not have Plato defined in our knowledge base. What about the next question:

```prolog
?- mortal(X).
```

That is, "Who (X) is mortal?". Prolog will respond `X = socrates` and bound Socrates to the variable `X`. Have you noticed the tremendous difference between imperative and declarative style?

In contrast to the imperative way of programming, we have not provided any instructions to the program how exactly the variable should be defined. We have just asked the engine a question, and it automatically bound a value to our variable `X`! This process of matching variables with items is called [*unification*](https://en.wikipedia.org/wiki/Unification_(computer_science)) and is precisely where logic programming has its strengths.

## Unification

The assignment statement is fundamental to most imperative programming languages. In Java or Ruby, the expression `x = 10` means that the value 10 is assigned to the variable x. Variables in both languages are mutable, meaning that `x = 20`  re-assigns the value 20 to the variable and the previous value is lost. In Prolog and other declarative languages, variables are only "variable" until they have been bound for the first time and become one with which they were unified. Hence we are using the term *unification*: the process of being united or made into a whole. We can find applications of unification also in imperative languages where it is typically used to enable [type inference](https://en.wikipedia.org/wiki/Type_inference).

Let us have a look at an example to make sure we get the idea.

```prolog
?- =(aristotle, aristotle).
true.

?- =(aristotle, socrates).
false.
```

The `=/2` predicate determines whether the two given arguments unify. Hence both arguments in the first example are the same atom Prolog returns true and false in the second case.

*Hint: Most constructs in Prolog use prefix syntax by default. There are a couple of built-in predicates such as `<`, `>`, `=` which use infix notation and you can even define your own pre-, in- and postfix operators. The above example could have also been written as `aristotle = aristotle.`.*

What about:

```prolog
?- X = Y.
true.
```

Well, that is an easy one. Both terms are variables, of course, they unify with each other (depending on your Prolog implementation you get true back). When Prolog resolves queries to come up with a conclusion, it tries to unify terms. Therefore a possible definition could be:

**Two terms unify if they are the same term or if they contain variables that can be uniformly instantiated with terms in such a way that the resulting terms are equal.**

## Lists
Hitherto we have only considered basic terms such as atoms, variables, integers and floating point numbers as arguments for our programs. However, in Prolog, like in other logic programming languages, the most common data-structure is the list. Lists in Prolog are a special case of terms. The syntax is identical to Python, they start and end with square brackets, and a comma separates each list item. Here is a simple list:
```prolog
['ancient philosophy', 1, socrates, 1.23, ['an atom in a nested list'] ].
```
Prolog provides a special facility to split the first part of the list (called the head) away from the rest of the list (known as the tail). We can place a special symbol `|` (pronounced 'bar') in the list to distinguish between the first item in the list and the remaining list. For example, consider the following.
```prolog
['ancient philosophy', 1, socrates, 1.23] = [H|T].
H = 'ancient philosophy',
T = [1, socrates, 1.23].
```
The unification here succeeds, H is bound to the first item in the list and T to the remaining list.

Prolog provides a bunch of handy operations for list manipulation such as append, flatten reverse etc. I will not go into more details here, just have a look at the [docs](http://www.swi-prolog.org/pldoc/man?section=lists) before you start writing your own predicates.
```prolog
% Appending a list
?- append([plato], ['ancient philosophy', 1, socrates, 1.23], X).
X = [plato, 'ancient philosophy', 1, socrates, 1.23].
```

## The Prolog shell

One notion of the Prolog shell. If you have tried to run the above snippets, you may have stumbled across the "Undefined procedure" error.

```prolog
?- man(socrates) .
ERROR: top-level: Undefined procedure: man/1 (DWIM could not correct goal)
```

The error is caused because of [Prolog's interactive top-level mode](http://www.swi-prolog.org/FAQ/ToplevelMode.html) in which you are only allowed to query the knowledge base. To define facts and rules in the shell, you have to specify them either in a sperate file and call `consult['my_knowledge_base.pl'] .`, use `assert` (`assert(man(socrates)).`) or consult user by typing `[user]` like in the following snippet:

```prolog
?- [user] .
man(socrates) .
% press CTRL-C to exit and return to query mode
|: true .
```

So far so good, we have seen the language's basics and can now express our problem in Prolog using simple facts and rules. We have also learned how to write queries for asking fundamental questions and how the engine derives conclusions by applying *unification*.

Let us now have a look at a slightly more specific problem and also introduce recursion, another fundamental concept in the language and logic programming in general.

## Recursion

As is commonly the case in many programming tasks, we often like to perform certain operations repeatedly either over a whole data-structure or until certain conditions are met. The way we typically do this in logic programming languages is by recursion. It merely means a program calls itself typically until some final point is reached.

In Prolog what this means is that we have a first fact that acts as a guard condition followed up by some rules that perform some operation before reinvoking itself.

## Four colour theorem

One classic application is the four colour theorem[^3] (sometimes called Guthrie's problem), which remained unsolved for approximately 124 years and was considered to be a hard problem till Kenneth Appel and Wolfgang Haken came finally up with a solution[^4]. The theorem states that, given any separation of a plane into contiguous regions, producing a plane map, no more than four colours are required to tint the regions of the map so that no two adjacent regions have the same colour. Two regions are called adjacent if they share a common boundary that is not a corner, where corners are the points shared by three or more regions.

So let us try to tint the map of all member states of the European Union using the four colour theorem.

First, we start with defining the land borders of each member country as facts in our knowledge base. The predicate `neighbours/2` determines the list of neighbours of a country.

```prolog
neighbours(austria        , [czech_republic, germany, hungary, italy,
                             slovenia, slovakia]).
neighbours(belgium        , [france, netherlands, luxemburg, germany,
                             united_kingdom]).
neighbours(bulgaria       , [romania, greece]).
neighbours(croatia        , [slovenia, hungary]).
neighbours(cyprus         , [greece]).
neighbours(czech_republic , [germany, poland, slovakia, austria]).
neighbours(denmark        , [germany, sweden]).
neighbours(estonia        , [finland, latvia, lithuania]).
neighbours(finland        , [estonia, sweden]).
neighbours(france         , [spain, belgium, luxemburg, germany, italy,
                             united_kingdom]).
neighbours(germany        , [netherlands, belgium, luxemburg, denmark,
                             france, austria, poland]).
neighbours(greece         , [bulgaria, cyprus]).
neighbours(hungary        , [austria, slovakia, romania, croatia,
                             slovenia]).
neighbours(ireland        , [united_kingdom]).
neighbours(italy          , [france, austria, slovenia]).
neighbours(latvia         , [estonia, lithuania]).
neighbours(luxemburg      , [belgium, france, germany]).
neighbours(malta          , []).
neighbours(netherlands    , [belgium, germany , united_kingdom]).
neighbours(poland         , [germany, czech_republic, slovakia,
                             lithuania]).
neighbours(portugal       , [spain]).
neighbours(romania        , [hungary, bulgaria]).
neighbours(slovakia       , [czech_republic, poland, hungary, austria]).
neighbours(slovenia       , [austria, italy, hungary, croatia]).
neighbours(spain          , [france, portugal]).
neighbours(sweden         , [finland, denmark]).
neighbours(united_kingdom , [ireland, netherlands, belgium, france]).
```

The predicate `colour_countries/1` is our main entry-point which we will later use to invoke the program. It first uses `setof/3` to create a list of terms in the form Country/Var. It then uses `colours/2` to bind each Var in this list to an appropriate colour.

```prolog
colour_countries(Colours) :-
  setof(Country/_, X^neighbours(Country,X), Colours),
  colours(Colours).
```

The predicate colours/1 just returns true if there are no elements in a given list.

```prolog
colours([]).
```

For a list of head Country/Colour and tail Rest, the predicate `colours/2` colours all the Rest. Then selects a value for Colour from the list of candidates, then check that there is no country in Rest which neighbours the Country just coloured and had the same Colour.

```prolog
colours([Country/Colour | Rest]):-
  colours(Rest),
  member(Colour, [green, yellow, red, purple]),
  \+ (member(CountryA/Colour, Rest), neighbour(Country, CountryA)).
```

The predicate `neighbour/2` determines whether or not two given countries are neighbours.

```prolog
neighbour(Country, CountryA):-
  neighbours(Country, Neighbours),
  member(CountryA, Neighbours).
```

The `member/2` predicate we have used in `colours/1` and `neighbours/2` is just a standard membership utility function which checks if X is a member of a given list.

```prolog
member(X, [X|_]).
member(X, [_|Tail]):-
  member(X, Tail).
```

Let us now execute the program by invoking `colour_countries/1`.

```prolog
?- colour_countries(Map).
Map = [
  austria/yellow,
  belgium/purple, bulgaria/yellow,
  croatia/yellow, cyprus/yellow, czech_republic/purple,
  denmark/yellow,
  estonia/red,
  finland/yellow, france/yellow,
  germany/red, greece/green,
  hungary/red,
  ireland/yellow, italy/red,
  latvia/green, luxemburg/green,
  malta/green,
  netherlands/yellow,
  poland/yellow, portugal/yellow,
  romania/green, slovakia/green, slovenia/green, spain/green, sweden/green,
  united_kingdom/green
  ].
```

That is really all, with a couple of lines of code we are done! The logic is ridiculously simple, and yet the program is still easy to follow. Think about how much code you would need to express the same problem in your favourite programming language!

Let us visually check if our program has concluded a correct solution and plot a map with the colour results retrieved from the `colour_countries/1` predicate. Observe that no two adjacent regions have the same colour. You can have a try if you can solve the problem with for example just three colours!

![Western Europe - Four Colour Theorem](./map_member_states_european_union_coloured.svg 'Western Europe - Four Colour Theorem')
The complete "Four Colour Theorem" code example is also available on my [github account](https://github.com/matchilling/kata-prolog/blob/master/src/four_color_theorem/index.pl).

## What Next?

If you find it as mind-blowing as I do with how few lines you can write reasonable programs why don't you try to solve one of those classic puzzles like for example the "[Tower of Hanoi](https://www.cpp.edu/~jrfisher/www/prolog_tutorial/2_3.html)" or the "[Escape from Zurg](http://web.engr.oregonstate.edu/~erwig/papers/Zurg_JFP04.pdf)" on your own? Try to solve one of the [99 Prolog problems](https://sites.google.com/site/prologsite/prolog-problems) as your daily Kata or become part of the collaborative text adventure project [BREXIT - A !serious adventure for the Ununited Kingdom](/brexit-call-for-collaboration/).

## Further resources

* [Learn Prolog Now!](http://www.learnprolognow.org) is an introductory course to programming in Prolog.
* [Online reference manual](http://www.swi-prolog.org/pldoc/doc_for?object=manual) for SWI Prolog.
* [SWI-Prolog google group](https://groups.google.com/d/forum/swi-prolog)
* [Prolog on stackoverflow.com](https://stackoverflow.com/questions/tagged/prolog)

## Footnotes

[^1]: Hunt, Andrew, et al. [The Pragmatic Programmer: From Journeyman to Master](https://pragprog.com/book/tpp/the-pragmatic-programmer). Addison-Wesley, 2015.

[^2]: Lally, Adam. [Natural Language Processing With Prolog in the IBM Watson System](https://www.cs.nmsu.edu/ALP/wp-content/uploads/2011/03/PrologAndWatson1.pdf), 2011.

[^3]: Rogers, Leo et al. [The Four Colour Theorem](https://nrich.maths.org/6291), 2008.

[^4]: Appel, Kenneth, and Wolfgang Haken. [Every planar map is four colourable](https://projecteuclid.org/download/pdf_1/euclid.ijm/1256049011), 1976.
