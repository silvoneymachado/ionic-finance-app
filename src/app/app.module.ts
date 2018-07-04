import { HttpClient } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicStorageModule } from "@ionic/storage";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpModule, Http } from "@angular/http";

import { ExpensePage, HomePage, RevenuePage, TabsPage } from "../pages/pages";
import {
  CategoryProvider,
  CategoryTypeProvider,
  ExpenseProvider,
  InitialItemsProvider
} from "../providers/providers";
import { ExpandableComponent } from "./../components/expandable/expandable";
import { MyApp } from "./app.component";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

const PROVIDERS = [
  ExpenseProvider,
  CategoryProvider,
  CategoryTypeProvider,
  InitialItemsProvider
];

@NgModule({
  declarations: [
    MyApp,
    ExpensePage,
    RevenuePage,
    HomePage,
    TabsPage,
    ExpandableComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
      }
    }),
    IonicStorageModule.forRoot({
      name: "__yenovlisfinancedb",
      driverOrder: ["sqlite", "indexeddb", "websql"]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, ExpensePage, RevenuePage, HomePage, TabsPage],
  providers: [
    HttpClient,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ...PROVIDERS
  ]
})
export class AppModule {}
