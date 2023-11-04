export default interface IApiService<TResult> {
  data: TResult | any;
  ok: boolean;
}
