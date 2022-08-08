import { ApiService } from '../service/api.service';
import {AfterViewInit,OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {

  bannerData :any=[] ;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  currency:string = "INR";
  constructor(private api :ApiService,private router : Router, private currencyservice : CurrencyService) { }
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
  this.getbannerdata();
  this.getalldata();
  this.currencyservice.getCurrency().subscribe(val=>{
    this.currency=val;
    this.getbannerdata();
    this.getalldata();
  })
  }

getbannerdata(){
  this.api.getTreandingcurreny(this.currency).subscribe(res=>{
    console.log(res); 
    this.bannerData=res ;
  })
}

getalldata(){
  this.api.getCurrencyData(this.currency).subscribe(res=>{
    console.log(res);
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
gotoDetails(row: any) {
  this.router.navigate(['coin-detail',row.id])
}
}
