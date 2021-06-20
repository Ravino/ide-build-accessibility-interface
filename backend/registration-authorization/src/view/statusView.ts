export class StatusView {

  constructor(
    public status?: string,
    public description?: string,
    public data?: any
  ) {}


  public addStatus(status: string) {
    this.status = status;
  }


  public addData(data: any) {
    this.data = data;
  }
}
