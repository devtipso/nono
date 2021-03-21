export class InterfaceQuery {
    take: number
    skip: number
    order: 'ASC' | 'DESC'
}

export class getReceptionObject {
    site?: number;
    start?: string;
    end?: string;
}

export class searchParamsContarts {
    entretien?: boolean;
    location?: boolean;
    code?: string;
    date?: Omit<getReceptionObject, "site">
    etat?: string;
}