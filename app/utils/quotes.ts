
type ErrorQuote = {
    quote: string;
    description: string;
    tags: string[];
};


export const errorQuotes: Record<string, { quote: string; description: string; tags: string[] }> = {
    starWarsDroids: {
        quote: "These aren't the droids you're looking for.",
        description: "The content you’re seeking isn’t here right now.",
        tags: ['404']
    },
    spaceOdyssey: {
        quote: "I'm sorry, Dave. I'm afraid I can't do that.",
        description: "The request couldn't be completed. Access denied or blocked.",
        tags: ['403', '500']
    },
    starWarsBadFeeling: {
        quote: "I have a bad feeling about this.",
        description: "Something went wrong. We’ve got a bad feeling too.",
        tags: ['500', 'any']
    },
    backToTheFuture: {
        quote: "Where we're going, we don't need roads.",
        description: "But we do need a valid response — and this one didn’t arrive.",
        tags: ['500', 'any']
    },
    xFiles: {
        quote: "The truth is out there... but not here.",
        description: "Whatever you’re looking for didn’t return the truth.",
        tags: ['404']
    },
    fewGoodMen: {
        quote: "You can't handle the truth!",
        description: "An unexpected error occurred. And that’s the truth.",
        tags: ['500']
    },
    sixthSense: {
        quote: "I see dead links.",
        description: "This one didn’t make it...",
        tags: ['404']
    },
    rockyHorror: {
        quote: "It's just a jump to the left!",
        description: "Maybe try jumping back to the homepage?",
        tags: ['404', 'any']
    },
    lordOfTheRings: {
        quote: "Not all who wander are lost... but you might be.",
        description: "Looks like you’ve wandered into an error.",
        tags: ['404', 'any']
    },
    terminator: {
        quote: "Hasta la vista, baby.",
        description: "This resource has been terminated.",
        tags: ['403', '500']
    },
    indianaJones: {
        quote: "That belongs in a museum!",
        description: "But this page doesn't exist anymore.",
        tags: ['404']
    },
    matrix: {
        quote: "There is no spoon.",
        description: "There is also no page here.",
        tags: ['404', 'any']
    },
    anchorman: {
        quote: "Well, that escalated quickly.",
        description: "Something went sideways. Try again later.",
        tags: ['500', 'any']
    },
    fightClub: {
        quote: "The first rule of Fight Club is: You do not talk about Fight Club.",
        description: "And the first rule of this error is: we don’t know what caused it.",
        tags: ['500', 'any']
    },
    inception: {
        quote: "You mustn't be afraid to dream a little bigger, darling.",
        description: "Unfortunately, this page doesn’t exist in any layer of the dream.",
        tags: ['404', '500']
    },
    jurassicPark: {
        quote: "Life, uh, finds a way.",
        description: "But not this time. Error encountered.",
        tags: ['500', 'any']
    },
    office: {
        quote: "I'm not superstitious, but I am a little stitious.",
        description: "Something went wrong. Try refreshing — or don’t. Who knows?",
        tags: ['500', 'any']
    },
    seinfeld: {
        quote: "Yada yada yada... no page.",
        description: "It was supposed to be here. It’s not. Yada yada.",
        tags: ['404']
    },
    ghostbusters: {
        quote: "We came, we saw, we kicked its... error?",
        description: "This page is no longer haunted. Try a new search.",
        tags: ['404', '500']
    },
};
