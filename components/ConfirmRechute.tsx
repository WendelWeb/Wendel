"use client";

import { RECHUTES, type Rechute } from "@/lib/serment";
import ConfirmIrreversible from "./ConfirmIrreversible";

/** La confirmation d'une rechute — le cas particulier du garde-fou commun. */
export default function ConfirmRechute({
  kind,
  jourActuel,
  record,
  pending,
  onAnnuler,
  onConfirmer,
}: {
  kind: Rechute;
  jourActuel: number;
  record: number;
  pending: boolean;
  onAnnuler: () => void;
  onConfirmer: () => void;
}) {
  return (
    <ConfirmIrreversible
      titre={RECHUTES.find((r) => r.id === kind)?.label ?? ""}
      detail="Si tu confirmes, ta série retombe à zéro tout de suite et la Vision se referme."
      labelConfirmer="Oui, j'ai vraiment cédé — remets à zéro"
      jourActuel={jourActuel}
      record={record}
      pending={pending}
      onAnnuler={onAnnuler}
      onConfirmer={onConfirmer}
    />
  );
}
