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
// home 页信息
export interface IHomeInfo {
    banner: IBanner
    searchRecomments:ISearchRecomment[]
    transformer: ITransformer[]
    scrollBarInfoList: IScrollBarInfo[]
    countdown:ICountdown
    activities:string[]
}

export interface IBanner{
    imgUrl:string
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

}
export interface IScrollBarInfo {
    type: string
    badge: string
    detail: string
    btn: string
}



