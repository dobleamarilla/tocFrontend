(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a4590028"],{"4c07":function(t,e,n){},"68a8":function(t,e,n){"use strict";n("4c07")},"9a0b":function(t,e,n){"use strict";n.r(e);var c=n("7a23"),i=Object(c["H"])("data-v-fc7a8842");Object(c["u"])("data-v-fc7a8842");var s={class:"row pt-1"},o={class:"col-md-1"},a={class:"d-flex flex-column align-items-stretch flex-shrink-0 bg-white",style:{width:"140px"}},l={class:"list-group list-group-flush border-bottom scrollarea"},r=Object(c["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(c["h"])("strong",{class:"mb-1"},"Vender")],-1),u=Object(c["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(c["h"])("strong",{class:"mb-1"},"Caja")],-1),b=Object(c["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(c["h"])("strong",{class:"mb-1"},"Pedidos")],-1),d=Object(c["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(c["h"])("strong",{class:"mb-1"},"Trabajador/a")],-1),h=Object(c["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(c["h"])("strong",{class:"mb-1"},"Devoluciones")],-1),f=Object(c["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(c["h"])("strong",{class:"mb-1"},"Entregas")],-1),p=Object(c["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(c["h"])("strong",{class:"mb-1"},"Técnico")],-1),g={class:"col"};Object(c["s"])();var j=i((function(t,e,n,j,m,O){var v=Object(c["y"])("router-link"),w=Object(c["y"])("router-view"),y=Object(c["y"])("ToastComponent");return Object(c["r"])(),Object(c["d"])(c["a"],null,[Object(c["h"])("div",s,[Object(c["h"])("div",o,[Object(c["h"])("div",a,[Object(c["h"])("div",l,[Object(c["h"])(v,{to:"/",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:i((function(){return[r]})),_:1}),Object(c["h"])(v,{to:"/menu/caja",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:i((function(){return[u]})),_:1}),Object(c["h"])("button",{onClick:e[1]||(e[1]=function(t){return j.pedidos()}),class:"list-group-item list-group-item-action py-3 lh-tight"},[b]),Object(c["h"])(v,{to:"/menu/fichajes",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:i((function(){return[d]})),_:1}),Object(c["h"])("button",{onClick:e[2]||(e[2]=function(t){return j.devoluciones()}),class:"list-group-item list-group-item-action py-3 lh-tight"},[h]),Object(c["h"])("button",{onClick:e[3]||(e[3]=function(t){return j.imprimirEntregas()}),class:"list-group-item list-group-item-action py-3 lh-tight"},[f]),Object(c["h"])(v,{to:"/menuTecnico",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:i((function(){return[p]})),_:1})])])]),Object(c["h"])("div",g,[Object(c["h"])(w)])]),Object(c["h"])(y)],64)})),m=n("5502"),O=n("bc3a"),v=n.n(O),w=n("0eb4"),y=n("a18c"),k=n("f06f"),x={name:"Menu",setup:function(){var t=Object(m["b"])(),e=Object(c["b"])((function(){return t.state.Menu.hidden})),n=k["a"].getParametros();function i(){t.dispatch("Ticket/setActivoAction",null)}function s(){t.dispatch("Menu/setHiddenAction",!0),i()}function o(){y["a"].push("/menu/pedidos/".concat(n.codigoTienda))}function a(t){y["a"].push(t)}function l(){t.dispatch("setModoActual","DEVOLUCION"),y["a"].push("/")}function r(){var t=842;v.a.get("http://dsv.hiterp.com/TpvInforma.asp?Llic=00".concat(t,"&Versio=6001010&Tipus=EntregasPendientes")).then((function(t){for(var e=t.data,n="",c=!1,i=0;i<e.length;i++)if(c||"]"===e[i-1]&&"a"===e[i-2]){if(c=!0,"]"===e[i])break;n+=e[i]}console.log(n)})),s(),i()}return{pedidos:o,devoluciones:l,isHidden:e,hideMenu:s,quitarActivoTicket:i,imprimirEntregas:r,goTo:a}},components:{ToastComponent:w["a"]}},T=(n("68a8"),n("6b0d")),C=n.n(T);const _=C()(x,[["render",j],["__scopeId","data-v-fc7a8842"]]);e["default"]=_}}]);
//# sourceMappingURL=chunk-a4590028.654b1d70.js.map