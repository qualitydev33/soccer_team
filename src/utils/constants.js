export const WSTORAGE_KEY = {
    team: 'team',
    teamName: 'teamName'
}

export const FORMATION_MODAL_CONTENT = {
    TOO_MANY_STARTER: {
        title: 'There are too many starters',
        desc: 'Your team has too many starters for one or more of the positions in the 4-3-3 formation'
    },
    NOT_ENOUGH_STARTER: {
        title: 'Not enough starters',
        desc: "Your team doesn't have enough starters for one or more of the positions in the 4-3-3 formation"
    },
    NO_DATA: {
        title: 'No player data found',
        desc: 'Please import your roster first'
    }
}

export const FORMATION_SYSTEM = {
    'sys-4-3-3': {
        'goalkeeper': ['top-1/2 left-2% -translate-y-1/2'],
        'defender': [
            'top-10% left-23%',
            'top-27% left-20%',
            'bottom-27% left-20%',
            'bottom-10% left-23%'
        ],
        'midfielder': [
            'top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2',
            'top-15% left-1/2 -translate-x-1/2',
            'bottom-15% left-1/2 -translate-x-1/2'
        ],
        'forward': [
            'top-15% left-70%',
            'top-1/2 left-74% -translate-y-1/2',
            'bottom-15% left-70%'
        ]
    }
}