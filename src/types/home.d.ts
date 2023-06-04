export interface ISearchRecomment {
    value: number
    label: string
}

export interface ISearchResultList {
    list:ISearchResult[]
}
export interface ISearchResult{
    type: number
    label: string
    resultCount: number
}
export interface IBanner{
    imgUrl:string
}
// home 页信息
export interface IHomeInfo {
    banner: IBanner
    searchRecomments:ISearchRecomment[]
    transformer: ITransformer[]
    scrollBarInfoList: IScrollBarInfo[]
    countdown:ICountdown
    activities:string[]
}


export interface ITransformer{
    imgUrl:string
    label:string
}

export interface ICountdown{
    time: number
    goods:IGood
}

export interface IGood{
    imgUrl:string
    name:string
    price:number
    oldPrice:number
}
export interface IScrollBarInfo {
    type: string
    badge: string
    detail: string
    btn: string
}



