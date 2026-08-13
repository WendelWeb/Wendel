// CE QUE JE VIENS DE CHOISIR — les deux futurs, ses mots.
//
// Chaque déclaration ouvre l'un des deux. Pas une récompense et une punition :
// deux trajectoires qui partent du même instant, et dont une seule sera vraie.
// Le mécanisme n'a de sens que si les deux sont écrits aussi nettement — sinon
// « je perpétue » resterait un bouton indolore, et c'est justement le problème
// qu'il a décrit.
//
// Client-safe.

export interface Consequence {
  titre: string;
  intro: string;
  etapes: { quand: string; quoi: string }[];
  chute: string;
}

/** Ce qu'il vient de choisir en déclarant « je le veux vraiment ». */
export const MONTEE: Consequence = {
  titre: "Tu viens de choisir que cela change",
  intro:
    "Pas dans dix ans. Pas quand tout sera prêt. À partir de la minute qui vient.",
  etapes: [
    {
      quand: "Avant la fin de cette semaine",
      quoi: "Même en niveau d'énergie. Ça se sentira dans le corps avant de se voir ailleurs.",
    },
    {
      quand: "Avant la fin de ce mois",
      quoi: "Même en niveau de vibration. Moi-même, changé — pas mes projets : moi.",
    },
    {
      quand: "Avant la fin de l'année",
      quoi: "Encore plus. Et cette fois avec des preuves que quelqu'un d'autre peut voir.",
    },
    {
      quand: "Dans six mois",
      quoi: "Inimaginable. Littéralement : je ne peux pas me le représenter aujourd'hui, et c'est bon signe.",
    },
  ],
  chute:
    "Tout ce que tu vas lire en dessous attend cet homme-là. Il commence par l'heure qui vient.",
};

/** Ce qu'il vient de choisir en perpétuant, ou en déclarant une rechute. */
export const DESCENTE: Consequence = {
  titre: "Tu viens de choisir de perpétuer le cycle",
  intro: "Si je ne change pas, rien ne change. C'est toute la mécanique.",
  etapes: [
    {
      quand: "La semaine prochaine",
      quoi: "La même. Exactement la même, au détail près.",
    },
    {
      quand: "Le mois prochain",
      quoi: "Le même cycle. Et encore plus enchaîné, parce qu'un cycle répété se resserre.",
    },
    {
      quand: "L'année prochaine",
      quoi: "La même année. Recopiée.",
    },
    {
      quand: "Et ensuite",
      quoi: "Comme ça fait maintenant 10 ans. Voilà la seule preuve dont tu disposes.",
    },
  ],
  chute:
    "Ce n'est pas une menace. C'est la description de ce qui s'est déjà passé dix fois.",
};
