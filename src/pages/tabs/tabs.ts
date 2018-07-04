import { Component } from "@angular/core";

import { HomePage, ExpensePage, RevenuePage } from "../pages";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = ExpensePage;
  tab3Root = RevenuePage;

  constructor() {}
}
