/**
 * Tarjan's strongly-connected-components algorithm. We use it to find
 * foreign-key cycles in a schema. An SCC of size >= 2 (or a single node
 * with a self-edge) is a cycle. Tested manually against:
 *   a -> b, b -> a              => 1 cycle of size 2
 *   a -> b, b -> c, c -> a      => 1 cycle of size 3
 *   a -> a                      => 1 cycle of size 1
 *   a -> b, b -> c              => 0 cycles
 *
 * Returns the list of cycles (each cycle is a list of node ids) so the
 * caller can record both count and largest size.
 */
export type Edge = { src: string; dst: string };

export function findCycles(edges: Edge[]): string[][] {
  const adj = new Map<string, string[]>();
  const selfLoops = new Set<string>();
  for (const e of edges) {
    if (e.src === e.dst) {
      selfLoops.add(e.src);
      continue;
    }
    if (!adj.has(e.src)) adj.set(e.src, []);
    adj.get(e.src)!.push(e.dst);
    if (!adj.has(e.dst)) adj.set(e.dst, []);
  }

  let index = 0;
  const indices = new Map<string, number>();
  const lowlinks = new Map<string, number>();
  const stack: string[] = [];
  const onStack = new Set<string>();
  const sccs: string[][] = [];

  // Iterative Tarjan to avoid blowing the call stack on schemas with
  // thousands of tables.
  function strongconnect(start: string) {
    type Frame = { v: string; it: number; neighbors: string[] };
    const work: Frame[] = [];

    const push = (v: string) => {
      indices.set(v, index);
      lowlinks.set(v, index);
      index += 1;
      stack.push(v);
      onStack.add(v);
      work.push({ v, it: 0, neighbors: adj.get(v) ?? [] });
    };

    push(start);

    while (work.length > 0) {
      const frame = work[work.length - 1];
      if (frame.it < frame.neighbors.length) {
        const w = frame.neighbors[frame.it++];
        if (!indices.has(w)) {
          push(w);
        } else if (onStack.has(w)) {
          frame.it; // no-op, keep eslint quiet
          lowlinks.set(frame.v, Math.min(lowlinks.get(frame.v)!, indices.get(w)!));
        }
      } else {
        // finished v
        const v = frame.v;
        work.pop();
        if (lowlinks.get(v) === indices.get(v)) {
          const scc: string[] = [];
          let w: string | undefined;
          do {
            w = stack.pop();
            if (w === undefined) break;
            onStack.delete(w);
            scc.push(w);
          } while (w !== v);
          if (scc.length >= 2) sccs.push(scc);
        }
        if (work.length > 0) {
          const parent = work[work.length - 1];
          lowlinks.set(parent.v, Math.min(lowlinks.get(parent.v)!, lowlinks.get(v)!));
        }
      }
    }
  }

  for (const v of adj.keys()) {
    if (!indices.has(v)) strongconnect(v);
  }

  // Self-loops are cycles of size 1.
  for (const v of selfLoops) sccs.push([v]);

  return sccs;
}
