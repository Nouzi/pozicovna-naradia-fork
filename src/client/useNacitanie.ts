import { useCallback, useEffect, useState } from 'react';

export type Nacitanie<T> = {
  data: T | null;
  chyba: string | null;
  nacitava: boolean;
  obnov: () => Promise<void>;
};

/**
 * Načíta dáta z API pri prvom zobrazení komponentu.
 * Funkcia `nacitaj` musí byť stála (napríklad api.naradie), inak by sa dáta načítavali stále dookola.
 */
export function useNacitanie<T>(nacitaj: () => Promise<T>): Nacitanie<T> {
  const [data, setData] = useState<T | null>(null);
  const [chyba, setChyba] = useState<string | null>(null);
  const [nacitava, setNacitava] = useState(true);

  // Stav nastavuje iba v callbackoch po odpovedi z API, nie synchrónne, preto ju smie volať aj efekt.
  // Zámerne cez .then, nie async/await: pravidlo react-hooks/set-state-in-effect nevidí, že setState je až po await.
  const nacitajDoStavu = useCallback(
    () =>
      nacitaj()
        .then((noveData) => {
          setData(noveData);
          setChyba(null);
        })
        .catch((e: unknown) => setChyba(e instanceof Error ? e.message : 'Dáta sa nepodarilo načítať.'))
        .finally(() => setNacitava(false)),
    [nacitaj]
  );

  const obnov = useCallback(async () => {
    setNacitava(true);
    await nacitajDoStavu();
  }, [nacitajDoStavu]);

  // `nacitava` je na začiatku true, takže efekt ho nemusí nastavovať a rovno načítava.
  useEffect(() => {
    void nacitajDoStavu();
  }, [nacitajDoStavu]);

  return { data, chyba, nacitava, obnov };
}
