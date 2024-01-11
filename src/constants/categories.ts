export enum CATEGORIES {
    smartphones = 'smartphones',
    computers = 'computers',
    wearables = 'wearables',
    cameras = 'cameras',
    audioDevices = 'audioDevices',

    gaming = 'gaming',

    homeTech = 'homeTech',

    computerComponents = 'computerComponents',
    accessories = 'accessories',

    vrArDevices = 'vrArDevices',
    drones = 'drones',
    printers3D = 'printers3D',

    software = 'software',
    techServices = 'techServices',
}

export const GROUPED_CATEGORIES = [
    {
        name_key: 'devices',
        subcategories: [CATEGORIES.smartphones, CATEGORIES.computers, CATEGORIES.wearables, CATEGORIES.cameras, CATEGORIES.audioDevices]
    },
    CATEGORIES.gaming,
    CATEGORIES.homeTech,
    {
        name_key: 'componentsAndAccessories',
        subcategories: [CATEGORIES.computerComponents, CATEGORIES.accessories]
    },
    {
        name_key: 'emergingTech',
        subcategories: [CATEGORIES.vrArDevices, CATEGORIES.drones, CATEGORIES.printers3D]
    },
    {
        name_key: 'softwareAndServices',
        subcategories: [CATEGORIES.software, CATEGORIES.techServices]
    }
]
