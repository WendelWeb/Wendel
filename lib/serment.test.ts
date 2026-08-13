import { describe, it, expect } from "vitest";
import {
  etatSerment,
  creneauOuvert,
  auditComplet,
  prochainCreneau,
  jourSuivant,
  CIBLE_JOURS,
  CRENEAUX,
  type Declaration,
  type RechuteDeclaree,
} from "./serment";

const AUJ = "2026-08-13";
const j = (n: number) => jourSuivant(AUJ, n);

/** Une journée pleine : les trois créneaux à « vouloir ». */
function pleine(date: string): Declaration[] {
  return CRENEAUX.map((c) => ({ date, creneau: c.id, choix: "vouloir" as const }));
}

const AUCUNE: RechuteDeclaree[] = [];

describe("les fenêtres horaires", () => {
  it("un créneau par plage, rien en dehors", () => {
    expect(creneauOuvert(5)).toBe("matin");
    expect(creneauOuvert(10)).toBe("matin");
    expect(creneauOuvert(11)).toBe("midi");
    expect(creneauOuvert(16)).toBe("midi");
    expect(creneauOuvert(17)).toBe("soir");
    expect(creneauOuvert(23)).toBe("soir");
    expect(creneauOuvert(2)).toBeNull();
    expect(creneauOuvert(4)).toBeNull();
  });

  it("les plages ne se chevauchent pas — impossible de déclarer deux créneaux à la même heure", () => {
    for (let h = 0; h < 24; h++) {
      const dedans = CRENEAUX.filter((c) => h >= c.debut && h <= c.fin);
      expect(dedans.length).toBeLessThanOrEqual(1);
    }
  });

  it("annonce le prochain créneau quand aucun n'est ouvert", () => {
    expect(prochainCreneau(3).id).toBe("matin");
  });
});

describe("l'audit à quatre cases", () => {
  it("les quatre, ou rien", () => {
    expect(
      auditComplet({ pasTiktok: true, pasGazeuse: true, pasPorn: true, fichiers: true }),
    ).toBe(true);
    expect(
      auditComplet({ pasTiktok: true, pasGazeuse: true, pasPorn: true, fichiers: false }),
    ).toBe(false);
    expect(
      auditComplet({ pasTiktok: false, pasGazeuse: true, pasPorn: true, fichiers: true }),
    ).toBe(false);
  });
});

describe("le compteur des 30 jours", () => {
  it("part de zéro", () => {
    expect(etatSerment([], AUCUNE, AUJ, 8).jours).toBe(0);
  });

  it("une journée complète compte, même aujourd'hui", () => {
    expect(etatSerment(pleine(AUJ), AUCUNE, AUJ, 20).jours).toBe(1);
  });

  it("deux créneaux sur trois ne comptent pas", () => {
    const partiel = pleine(AUJ).slice(0, 2);
    expect(etatSerment(partiel, AUCUNE, AUJ, 20).jours).toBe(0);
  });

  it("compte les jours consécutifs", () => {
    const d = [...pleine(j(-3)), ...pleine(j(-2)), ...pleine(j(-1))];
    expect(etatSerment(d, AUCUNE, AUJ, 8).jours).toBe(3);
  });

  it("un trou dans les dates casse la chaîne", () => {
    const d = [...pleine(j(-5)), ...pleine(j(-4)), ...pleine(j(-1))];
    expect(etatSerment(d, AUCUNE, AUJ, 8).jours).toBe(1);
  });

  it("un seul « perpétuer » casse la journée entière", () => {
    const d: Declaration[] = [
      ...pleine(j(-2)),
      { date: j(-1), creneau: "matin", choix: "vouloir" },
      { date: j(-1), creneau: "midi", choix: "perpetuer" },
      { date: j(-1), creneau: "soir", choix: "vouloir" },
    ];
    expect(etatSerment(d, AUCUNE, AUJ, 8).jours).toBe(0);
  });

  it("une rechute annule la journée même si les trois créneaux sont tenus", () => {
    const d = [...pleine(j(-2)), ...pleine(j(-1))];
    const r: RechuteDeclaree[] = [{ date: j(-1), kind: "porn" }];
    expect(etatSerment(d, r, AUJ, 8).jours).toBe(0);
  });

  it("une rechute aujourd'hui remet à zéro et se voit", () => {
    const d = [...pleine(j(-1)), ...pleine(AUJ)];
    const r: RechuteDeclaree[] = [{ date: AUJ, kind: "tiktok" }];
    const e = etatSerment(d, r, AUJ, 20);
    expect(e.rechuteAujourdhui).toBe(true);
    expect(e.jours).toBe(1); // hier tient encore ; aujourd'hui ne compte pas
  });

  it("débloque à 30 jours, pas à 29", () => {
    const vingtNeuf = Array.from({ length: 29 }, (_, i) => pleine(j(-(i + 1)))).flat();
    expect(etatSerment(vingtNeuf, AUCUNE, AUJ, 8).debloque).toBe(false);
    const trente = Array.from({ length: 30 }, (_, i) => pleine(j(-(i + 1)))).flat();
    const e = etatSerment(trente, AUCUNE, AUJ, 8);
    expect(e.jours).toBe(CIBLE_JOURS);
    expect(e.debloque).toBe(true);
  });

  it("garde la plus longue série même après une remise à zéro", () => {
    // Neuf jours tenus, une rechute, puis deux jours.
    const serie = Array.from({ length: 9 }, (_, i) => pleine(j(-(i + 4)))).flat();
    const apres = [...pleine(j(-2)), ...pleine(j(-1))];
    const r: RechuteDeclaree[] = [{ date: j(-3), kind: "gazeuse" }];
    const e = etatSerment([...serie, ...apres], r, AUJ, 8);
    expect(e.jours).toBe(2);
    expect(e.record).toBe(9);
  });

  it("annonce la date d'ouverture d'après ce qui reste", () => {
    const d = Array.from({ length: 10 }, (_, i) => pleine(j(-(i + 1)))).flat();
    const e = etatSerment(d, AUCUNE, AUJ, 8);
    expect(e.jours).toBe(10);
    expect(e.dateOuverture).toBe(jourSuivant(AUJ, 20));
  });

  it("compte les déclarations du jour pour l'affichage", () => {
    const d = pleine(AUJ).slice(0, 2);
    expect(etatSerment(d, AUCUNE, AUJ, 12).faitAujourdhui).toBe(2);
  });
});
