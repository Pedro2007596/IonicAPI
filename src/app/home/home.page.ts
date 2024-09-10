import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {retry, catchError, find} from 'rxjs/operators'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  films: Observable<any> | undefined;


  constructor(private router : Router, private http: HttpClient, public toastController: ToastController) {}

  ngOnInit() {
    this.films = this.http.get('https://swapi.dev/api/films').pipe(
      catchError(erro => this.exibirErro(erro))
    )
  }

  async exibirErro(erro){
    const toast = await this.toastController.create({
      message : 'Erro ao consultar a API:' + erro.status + ':' + erro.message,
      duration: 4000,
      color: 'danger',
      position: 'middle'
    })
  }

    openDetails(film){
      const split = find.url.split('/');
      const filmId = split[5];
      this.router.navigateByUrl(`/filme-detalhe/${filmId}`)
    }
}
