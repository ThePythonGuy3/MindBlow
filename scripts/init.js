const damagedColor = Color.valueOf("ffa5a5");
const ui = require("ui-lib/library")
var shootnum = 0;
var bullettoshoot;
var hltrn;
var isthere = 0;
var togglevar = 1;
var wd;
var icn = Icon.lock;
if (typeof(drawrect)== "undefined"){
  const drawrect = method => new Packages.arc.scene.ui.layout.Table.DrawRect(){get : method};
}

const hpring = extend(Packages.arc.scene.style.Drawable, {
  last:1,
  lastframe:0,
  hpscl(f){
  	this.last = Mathf.lerp(this.last, f, 0.1);
  	return this.last;
  },
  draw(x, y, w, h){
    if(isthere == 0){
      const bre = ui.addButton("button1", icn, button => {
        if(togglevar == 0){
          togglevar = 1;
          icn = Icon.lockOpen;
        } else {
          togglevar = 0;
          icn = Icon.lock;
        }
      });
      isthere = 1;
    };
    if(Vars.player.getTimer().getTime(Vars.player.getShootTimer(true))<=1||Vars.player.getTimer().getTime(Vars.player.getShootTimer(false))<=1){
      shootnum++;
    };
    if(shootnum > 60 && Vars.player.health()>Vars.player.maxHealth()*0.5){
      bullettoshoot = Vars.player.getWeapon().bullet;
      hltrn = Mathf.round(Vars.player.health()/10);
      for(i = 0; i < hltrn; i++){
        Calls.createBullet(bullettoshoot, Vars.player.getTeam(), Vars.player.getX(), Vars.player.getY(), Mathf.random(Vars.player.rotation - 20, Vars.player.rotation + 20), 0.5, 1.75)
      };
      shootnum = 0;
    } else if (shootnum > 60) {
      shootnum = 60;
    };
    if(togglevar == 0) return;
    var hp = Vars.player.health()/Vars.player.maxHealth();
    if(!Mathf.equal(hp, this.last) || (Vars.player.getTimer().getTime(Vars.player.getShootTimer(true))<=1||Vars.player.getTimer().getTime(Vars.player.getShootTimer(false))<=1)) this.lastframe = Time.time();
    var scl = this.hpscl(hp);
    var a = (60 - (Time.time() - this.lastframe))/60;
    if(a <= 0) return;
    Lines.stroke(8);
    var cv = Core.input.mouseScreen(Vars.player.getX(),Vars.player.getY());
    Draw.color(Color.darkGray, a);
    Lines.circle(cv.x, cv.y, 64);
    Lines.circle(cv.x, cv.y, 54);
    if(hp < scl){
      Draw.color(damagedColor, a);
      Lines.polySeg(360, 360*hp, 360*scl, cv.x, cv.y, 64, 0);
    }
    else this.last = hp;
    Draw.color(Color.valueOf("ff341c"), a);
    Lines.polySeg(360, 0, 360*hp, cv.x, cv.y, 64, 0);
    wd = a;
    if(shootnum > 59 && Vars.player.health()<Vars.player.maxHealth()*0.5 && wd > 0.4){
      a += (Mathf.sinDeg(Time.time()*12)-(a*0.5)-0.5);
    };
    Draw.color(Color.valueOf("59b4de").add(Color.rgb((100/60)*shootnum,(100/60)*shootnum,(100/60)*shootnum)), a);
    Lines.polySeg(360, 0, (360/60)*shootnum, cv.x, cv.y, 54, 0);
    Lines.stroke(1);
    Draw.color();
    Draw.reset();
    a = wd;

  }
});

var t = this;

if (!this.global.mindblowUI) {
	this.global.mindblowUI = true;

	Events.on(EventType.ClientLoadEvent, run(e => {
		const t = new Table();
		t.setFillParent(true);
    t.addImage(hpring);
		t.visible(boolp(() => Vars.state.state == GameState.State.playing));
		Vars.ui.hudGroup.addChildAt(0, t);
	}));
}