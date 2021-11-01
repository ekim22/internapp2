import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private _pageSizeOptions = [1, 5, 10, 15, 25];
  private _pageSize = 10;
  private _pageIndex = 0;

  get pageSizeOptions(): number[] {
    return this._pageSizeOptions;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
  }

  get pageIndex(): number {
    return this._pageIndex;
  }

  set pageIndex(value: number) {
    this._pageIndex = value;
  }

  setPageOptionsToDefault() {
    this._pageSize = 10;
    this._pageIndex = 0;
  }
}
