import { Morphism } from "../../types/function.js"

type MapMorphism<I, O> = Morphism<[item: I, index: number, array: I[]], O>

export function map<I, O>(fn: MapMorphism<I, O>, input: I[]): O[]
export function map<I, O>(fn: MapMorphism<I, O>): (input: I[]) => O[]
