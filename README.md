# Yet Another Hex Graph, in typescript

hexgraph is an implementation of [Amit Patel][redblob]'s 
[Hexagonal Grids][hexgrid] in TypeScript. I have built on the 
[implementation][heximp] with other ideas, including relationship graphs between
grid parts.

## Motivation

I love turn-based roleplaying and strategy games, and I wanted to learn a whole
bunch of things about programming and math all at once, so I thought "let's
build a game library!" I was intrigued by the hexagonal grid concept in Sid
Meier games and thought to use it to learn a language. The point of the exercise
is to build -- rather than to use -- the library, so YAGNI doesn't apply.

## Documentation

The concepts are [thoroughly discussed][hexgrid], so I will stick to the hows
and whys of my implementation.

I wrote in TypeScript because that's what I'm trying to learn. Typedoc output
is at [/docs](./docs/).

I've chosen to use cube coordinates for algorithmic simplicity. All
coordinate-based functions accept cube coordinates, which allows passing
`HexNode`s around as parameters.

### Conventions

`CONSTANTS` are in all caps. `Classes`, `Interfaces`, and `Enums` are in
PascalCase, and `variables` and `functions` are in camelCase. Eslint, prettier,
and typescript configuration are included. I use automatic style linting on all
my code, two space indentations, and hardwrap code at 80 characters. I am not
married to these decisions, but being consistent improves readability.


<img src="directions.svg" width="300" height="300" alt="0,0,0 and its neighbors" />
<img src="diagonals.svg" width="400" height="400" alt="0,0,0 and the cells diagonal to it" />

## Task List
 - cell labelling
 - ~~cell groups~~
   - ~~line~~
   - ~~ring~~
   - ~~hexagon~~
   - ~~cone (triangle with origin and direction)~~
 - ~~cell group overlaps~~
 - rotation
 - rounding
   - nearest edge
   - nearest vertex
 - state
 - pathing
   - field of view
   - obstacles
   - range
 - storage

# ⬢⬣⬢⬣⬢⬣⬢⬣

[redblob]: https://www.redblobgames.com/
[hexgrid]: https://www.redblobgames.com/grids/hexagons/
[heximp]: https://www.redblobgames.com/grids/hexagons/implementation.html
[vscode]: https://code.visualstudio.com/
[sqrt3]: https://en.wikipedia.org/wiki/Square_root_of_3#Geometry_and_trigonometry
[pi]: https://en.wikipedia.org/wiki/Pi#Geometry_and_trigonometry
