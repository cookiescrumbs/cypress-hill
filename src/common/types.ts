export interface HashMapofAppConf {
    [key: string]: AppConf;
}

export interface AppConf {
    baseUrl: string,
    specs?: string
}