(this.webpackJsonpsongbinator=this.webpackJsonpsongbinator||[]).push([[0],{61:function(t,e,a){t.exports=a(93)},66:function(t,e,a){},67:function(t,e,a){},87:function(t,e,a){},93:function(t,e,a){"use strict";a.r(e);var n=a(0),s=a.n(n),r=a(9),i=a.n(r),c=(a(66),a(20)),o=a(15),l=a(27),u=a(28),d=a(30),h=a(48),m=a.n(h),p=(a(67),a(68),function(t){function e(){return Object(c.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(o.a)(e,[{key:"redirect",value:function(){window.location.href="https://accounts.spotify.com/authorize?client_id=b9147e7fb3954d24a264480d4a63700d&redirect_uri=http://127.0.0.1:5000/successLoginDone&scope=playlist-modify-public playlist-modify-private playlist-read-private&response_type=code"}},{key:"render",value:function(){var t=this;return n.createElement("div",null,n.createElement("button",{className:"button",onClick:function(){return t.redirect()}},"Login"))}}]),e}(n.Component)),E=a(26),v=a.n(E),f=a(35),b=a(13),g=a(131),k=a(130),y=a(31),_=a.n(y),x=(a(87),function(t){function e(t){var a;return Object(c.a)(this,e),(a=Object(l.a)(this,Object(u.a)(e).call(this,t))).state={artist:"",tracks_state:{tracks:[]},loader:!1,artist_list:[],suggested_artists:[]},a.handleChange=a.handleChange.bind(Object(b.a)(a)),a.handleChangeAutocomplete=a.handleChangeAutocomplete.bind(Object(b.a)(a)),a.addArtist=a.addArtist.bind(Object(b.a)(a)),a.removeArtist=a.removeArtist.bind(Object(b.a)(a)),a}return Object(d.a)(e,t),Object(o.a)(e,[{key:"handleChange",value:function(){var t=Object(f.a)(v.a.mark((function t(e){var a,n,s;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={suggested_artists:[]},n=[],s=e.target.value,t.next=5,_.a.get("/getSuggestedArtists?name="+s);case 5:a=t.sent,n=a.data.suggested_artists,this.setState({artist:s}),this.setState({suggested_artists:n});case 9:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"handleChangeAutocomplete",value:function(){var t=Object(f.a)(v.a.mark((function t(e){var a;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=e.target.textContent,this.setState({artist:a});case 2:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"addArtist",value:function(t){var e=this.state.artist_list;e=e.concat({name:t}),this.setState({artist_list:e}),this.setState({artist:""})}},{key:"removeArtist",value:function(t){var e=this.state.artist_list;e.splice(t,1),this.setState({artist_list:e})}},{key:"createPlaylist",value:function(){var t=Object(f.a)(v.a.mark((function t(){var e,a,n,s,r,i,c,o,l,u,d,h,m,p,E,f,b,g,k,y;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e={related_artists:[]},a={tracks:[]},n=[],s={tracks:[]},r=[],this.setState({loader:!0}),t.prev=6,i=!0,c=!1,o=void 0,t.prev=10,l=this.state.artist_list[Symbol.iterator]();case 12:if(i=(u=l.next()).done){t.next=23;break}return d=u.value,t.next=16,_.a.get("/getSimilarArtists?name="+d.name+"&artists="+this.state.artist_list.length);case 16:e=t.sent,r=r.concat(e.data.related_artists),console.log("ARTIIIIIIST"),console.log(r);case 20:i=!0,t.next=12;break;case 23:t.next=29;break;case 25:t.prev=25,t.t0=t.catch(10),c=!0,o=t.t0;case 29:t.prev=29,t.prev=30,i||null==l.return||l.return();case 32:if(t.prev=32,!c){t.next=35;break}throw o;case 35:return t.finish(32);case 36:return t.finish(29);case 37:h=r.reduce((function(t,e){return t.some((function(t){return t.name===e.name}))||t.push(e),t}),[]),console.log("ALLLLLLLLLLLLLLLLLL OF THEEEEEEEEEEEEEEEM"),console.log(h),m=!0,p=!1,E=void 0,t.prev=43,f=h[Symbol.iterator]();case 45:if(m=(b=f.next()).done){t.next=54;break}return g=b.value,t.next=49,_.a.get("/getTracks?name="+g.name);case 49:a=t.sent,n=n.concat(a.data.tracks);case 51:m=!0,t.next=45;break;case 54:t.next=60;break;case 56:t.prev=56,t.t1=t.catch(43),p=!0,E=t.t1;case 60:t.prev=60,t.prev=61,m||null==f.return||f.return();case 63:if(t.prev=63,!p){t.next=66;break}throw E;case 66:return t.finish(63);case 67:return t.finish(60);case 68:return n&&(s.tracks=n),console.log("YEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"),console.log(n),this.setState({tracks_state:s}),t.next=74,_.a.get("/createPlaylist");case 74:return k=t.sent,y={tracks:this.state.tracks_state,token:k.data.token,playlist:k.data.playlist_id},t.next=78,_.a.post("/addTracks",y);case 78:this.setState({loader:!1}),t.next=83;break;case 81:t.prev=81,t.t2=t.catch(6);case 83:case"end":return t.stop()}}),t,this,[[6,81],[10,25,29,37],[30,,32,36],[43,56,60,68],[61,,63,67]])})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this,e=!0;this.state.suggested_artists&&this.state.suggested_artists.map((function(a){a.name===t.state.artist&&""!==t.state.artist&&(e=!1)}));var a=!(this.state.artist_list.length>0),s=!1;this.state.artist_list.map((function(e){e.name===t.state.artist&&(s=!0)}));var r=!1===this.state.loader&&0!==this.state.tracks_state.tracks.length;return n.createElement("div",null,this.state.loader?n.createElement("p",null,"Loading..."):n.createElement("div",null,this.state.loader||r?n.createElement("p",null,"Playlist created!"):n.createElement("div",{className:"mainComponent"},n.createElement("div",{className:"box inputBox"},n.createElement(g.a,{freeSolo:!0,options:this.state.suggested_artists,getOptionLabel:function(t){return t.name},onChange:this.handleChangeAutocomplete,renderInput:function(e){return n.createElement(k.a,Object.assign({},e,{label:"Artist Name",variant:"outlined",fullWidth:!0,value:t.state.artist,onChange:t.handleChange}))}}),n.createElement("div",{className:"menuButtons"},n.createElement("button",{className:"button",disabled:e||s,onClick:function(){return t.addArtist(t.state.artist)}},"Add"),n.createElement("button",{className:"button",disabled:a,onClick:function(){return t.createPlaylist()}},"Create playlist"))),this.state.tracks_state.tracks&&this.state.tracks_state.tracks.map((function(t){return n.createElement("p",null,t.track_name)})),n.createElement("div",{className:"artistContainer"},0===this.state.artist_list.length&&n.createElement("div",{className:"artistText"}," Insert artist "),this.state.artist_list&&this.state.artist_list.map((function(e,a){return n.createElement("div",{className:"box artistComponent",key:a},n.createElement("div",{className:"selectedArtist"},n.createElement("p",null,e.name),n.createElement("button",{className:"button XButton",onClick:function(){return t.removeArtist(a)}},"X")))}))))))}}]),e}(n.Component)),O=function(t){function e(){return Object(c.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(o.a)(e,[{key:"render",value:function(){var t=void 0!==m.a.get("spotify_code");return s.a.createElement("div",{className:"App"},t?s.a.createElement(x,null):s.a.createElement(p,null))}}]),e}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[61,1,2]]]);
//# sourceMappingURL=main.9dfad158.chunk.js.map