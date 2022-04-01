import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'
@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations:[
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})

export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[]

  searchBarState = 'hidden'

  searchForm: FormGroup

  searchControl: FormControl

  constructor(private restaurantsService: RestaurantsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')

    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .debounceTime(500) //A busca só é realizada após 500ms depois do último evento -> Previne buscas incessantes ao banco após a digitação de cada letra
      .distinctUntilChanged() //Emite eventos apenas se o último evento for diferente do próximo
      // .do(searchTerm => console.log(`q = ${searchTerm}`)) Função usada para verificar os valores de pesquisa ao banco -> Era necessário apenas por motivos de consulta
      .switchMap(searchTerm => 
        this.restaurantsService
        .restaurants(searchTerm)
        .catch(error => Observable.from([])))
      .subscribe(restaurants => this.restaurants = restaurants)


    this.restaurantsService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants)
  }

  toggleSearch(){ this.searchBarState = this.searchBarState === 'hidden'? 'visible' : 'hidden' }
}
