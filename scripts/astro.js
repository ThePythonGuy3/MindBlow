var soundcont = [];
function loadsound(name){
  if(soundcont[name] !== undefined && soundcont[name] !== null && soundcont[name] != Sounds.none) return;
  try{
    (Core.assets.load("sounds/"+ name +".ogg", Packages.arc.audio.Sound)).loaded = cons(a => {
      try{
        soundcont[name] = a;
        print("Loaded sound: "+name);
      }
      catch(err){
        soundcont[name] = Sounds.none;
        print("Failed to load sound!");
        print(err);
      }
    });
  }
  catch(err){
    soundcont[name] = Sounds.none;
    print("Failed to load sound!");
    print(err);
  }
  if(!soundcont[name]){
    soundcont[name] = Sounds.none;
  }
}
const kbull = extend(BasicBulletType, {
	draw(b){
		Draw.color(Color.rgb(Mathf.random(150,255),Mathf.random(150,255),Mathf.random(150,255)));
		Fill.circle(b.x,b.y,13);
		Draw.reset();
	},
	update(b){
		if(Mathf.chance(0.3)){
			Damage.damage(b.team,b.x,b.y,13,20);
		}
		if(Mathf.chance(0.5)){
			Lightning.create(b.team, Color.rgb(Mathf.random(150,255),Mathf.random(150,255),Mathf.random(150,255)), 10, b.x, b.y, Mathf.random(0,360), 10);
		}
		if(b.fin()*20>19){
			Sounds.artillery.at(b.x,b.y);
			for(i = 0; i < 3; i++){
				Calls.createBullet(Bullets.artilleryPlastic,b.team,b.x,b.y,i*120+Mathf.random(0,90),1,0.35);
			}
		}
	}
});
kbull.collides = false;
kbull.lifetime = 300;
kbull.speed = 2;
kbull.damage = 0;
kbull.despawnEffect = newEffect(20, e=>{
	Draw.color(Color.rgb(Mathf.random(150,255),Mathf.random(150,255),Mathf.random(150,255)));
	Fill.circle(e.x,e.y,e.fout()*8+5);
	Draw.reset();
	Lines.spikes(e.x, e.y, Mathf.sinDeg(e.fout()*160)*20, Mathf.sinDeg(e.fout()*50)*5, 10, e.fout()*360);
	Lines.stroke(e.fout()*2);
	Lines.circle(e.x,e.y,e.fin()*12+5);
	Lines.stroke(1);
});
const astro = extendContent(ChargeTurret,"astro",{
	load(){
		this.super$load();
		this.baseRegion = Core.atlas.find("mindblow-block-6")
		this.animregions = [];
		loadsound("astrocharge")
	},
	generateIcons(){
		return [
			Core.atlas.find("mindblow-block-6"),
			Core.atlas.find("mindblow-astro")
		]
	}
});
astro.chargeTime = 180;
astro.chargeEffect = newEffect(180, e => {
	if(e.fin()*120<=1){
		soundcont.astrocharge.at(e.x,e.y);
	}
	if(e.fin()*120>=119){
		Sounds.shotgun.at(e.x,e.y);
	}
	Draw.color(Color.rgb(Mathf.random(150,255),Mathf.random(150,255),Mathf.random(150,255)));
	Fill.circle(e.x,e.y,e.fin()*8+5);
	Draw.reset();
	Lines.spikes(e.x, e.y, Mathf.sinDeg(e.fin()*160)*20, Mathf.sinDeg(e.fin()*50)*5, 10, e.fin()*360);
});
astro.chargeBeginEffect = newEffect(180, e=> {
	Draw.color(Color.rgb(Mathf.random(150,255),Mathf.random(150,255),Mathf.random(150,255)));
	Lines.stroke(e.fin()*20);
	Lines.circle(e.x,e.y,e.fout()*10);
	Lines.stroke(1);
});
astro.shootType = kbull;
astro.powerUse = 5;
astro.rotatespeed = 0.5;
astro.heatColor = Color.valueOf("7474ed");
astro.range = 400;
astro.reload = 600;
astro.recoil = 100;
astro.restitution = 5;
astro.shootCone = 20;
astro.shootShake = 5;
astro.chargeEffects = 1;
astro.targetAir = false;
astro.animtimer = astro.timers++;
astro.entityType = prov(() => {
	const entity = extendContent(ChargeTurret.LaserTurretEntity, astro, {
		getFrame(){
			return this._frame;
		},
		setFrame(val){
			this._frame = val;
		},
		getPrevtime(){
			return this._prevtime;
		},
		setPrevtime(val){
			this._prevtime = val;
		}
	});
	entity.setFrame(0);
	entity.setPrevtime(0);
	return entity;
});