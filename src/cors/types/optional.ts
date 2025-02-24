/*

    type Post {
        id: string;
        email:string;
        name:string;
    }

    Optional<Post,'id'| 'email'>

*/

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
