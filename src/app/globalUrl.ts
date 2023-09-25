import { OnInit, Directive } from '@angular/core';
import configJson from 'src/assets/config.json'

@Directive()
export class globalUrl implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
    public static signInUrl = configJson.signInUrl;
    public static signInUrl1 = 'user/';
    public static signIn = globalUrl.signInUrl + globalUrl.signInUrl1 + 'login';

    public static signupUrl = globalUrl.signInUrl + 'signup'

    public static gateWayUrl = configJson.gateWayUrl;

    public static dashboardUrl = configJson.gateWayUrl + 'dashboard' + '/details'

    public static checkTokenUrl = configJson.checkTokenUrl + 'checkToken'

    public static categoryUrl = configJson.gateWayUrl + 'category'

    public static productUrl = configJson.gateWayUrl + 'product'

    public static billUrl = configJson.gateWayUrl + 'bill'

    public static usersUrl = configJson.gateWayUrl + 'user'





}
