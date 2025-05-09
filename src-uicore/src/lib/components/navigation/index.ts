export { default as Navigation } from "./Navigation.svelte";
export { default as TabNavigation } from "./TabNavigation.svelte";
export { default as SideNavigation } from "./SideNavigation.svelte";

interface WithUrl {
      href: string;
      match?: number;
};

interface WithChildren {
      children: (SideNavigationItem & WithUrl)[];
};

export type SideNavigationItemBase = {
      icon: string;
      label: string;
      badge?: string | number | null | undefined;
};

export type SideNavigationItem = (WithUrl | WithChildren) & SideNavigationItemBase;

export type NavigationProperties<T> = {
      items: T[];
      pathSelector: (item: T) => string;
      match?: number;
      matchQuery?: string;
      active?: number;
      onchange?: (item: T, index: number) => void;
};

export function matchPath(
      _path: string,
      _current: string,
      matchPathSegments: number,
      matchQuery: string | undefined
): boolean {
      // eslint-disable-next-line prefer-const
      let [path, pathQueries] = _path.split('?');
      // eslint-disable-next-line prefer-const
      let [curr, currQueries] = _current.split('?');
      if (path.endsWith('/')) path = path.slice(0, -1);
      if (curr.endsWith('/')) curr = curr.slice(0, -1);
      if (matchPathSegments === 0 && !matchQuery) return path === curr;
      if (matchQuery) {
            const pathQuery = pathQueries?.split('&').find((q) => q.startsWith(matchQuery));
            const currQuery = currQueries?.split('&').find((q) => q.startsWith(matchQuery));
            if (!pathQuery || !currQuery || pathQuery !== currQuery) return false;
            if (matchPathSegments == 0) return true;
      }
      const currSplit = curr.split('/');
      const pathSplit = path.split('/');
      for (let i = 0; i <= matchPathSegments; i++) {
            if (currSplit[i] !== pathSplit[i]) return false;
      }
      return true;
}