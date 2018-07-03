import { Component } from '@angular/core';

import { HomePage, DespesaPage, ReceitaPage } from "../index";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = DespesaPage;
  tab3Root = ReceitaPage;

  constructor() {}
}
