export type Participants = {
    [participantID: string]: string;
};

export type Nomination = {
    userID: string;
    text: string;
};

type NominationID = string;

export type Nominations = {
    [nominationID: NominationID]: Nomination;
};

export type Rankings = {
    // each user has an array of their picks, e.g. Mcd, Burger King, KFC
    [userID: string]: NominationID[];
};

export type Results = Array<{
    nominationID: NominationID;
    nominationText: string;
    score: number;
}>;

export type Poll = {
    id: string;
    topic: string;
    votesPerVoter: number;
    participants: Participants;
    adminID: string;
    nominations: Nominations;
    rankings: Rankings;
    results: Results;
    hasStarted: boolean;
};
