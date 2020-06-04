const elib = require("effectlib");
var placingabi = true;
const changerBullet = extend(BasicBulletType, {
    hitTile: function(b, tile){
        this.hit(b);
        if(tile.entity != null){
            tile.setTeam(b.getTeam());
        };
    },
    draw(b){}
});
changerBullet.speed = 1;
changerBullet.damage = 0;
changerBullet.lifetime = 60;
changerBullet.hitEffect = Fx.none;
changerBullet.despawnEffect = Fx.none;
changerBullet.smokeEffect = Fx.none;
changerBullet.shootEffect = Fx.none;

const explosioneffectforthis = newEffect(20, e => {
    elib.outlineCircle(e.x, e.y, Color.valueOf("32f0ff"), e.fout() * 5, e.fin() * 60);
});
const changerturret = extendContent(Block, "changer", {
    onPlaced(){
        this.super$onPlaced();
        entity.setTicking(0);
    },
    load(tile){
        this.animRegion = [];
        for(var i = 0; i < 6; i++){
            this.animRegion.push(Core.atlas.find(this.name + "-" + i));
        }
    },
    update(tile){
    	entity = tile.ent();
        print(entity.getTicking());
        placingabi = false;
        this.super$update(tile);
        
        
        if(entity.timer.get(this.bulletTimer, 50)){
            if(entity.getTicking() < 5){
                Sounds.buttonClick.at(tile.drawx(), tile.drawy())
            }
            if(entity.getTicking() > 4){
                for(var i = 0; i < 721; i++){
                    Calls.createBullet(changerBullet, tile.getTeam(), tile.drawx(), tile.drawy(), i, Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0));
                }
                Effects.effect(explosioneffectforthis, tile.drawx(), tile.drawy(), 5);
                entity.setTicking(0);
                placingabi = true;
                entity.kill();            
            }
            if(entity.getTicking() < 5){
                entity.setTicking(entity.getTicking() + 1);
            }
        }
    },
    onDestroyed(tile){},
    canPlaceOn(tile){
        return placingabi;
    },
    draw(tile){
		entity = tile.ent();
        Draw.rect(this.animRegion[entity.getTicking()], tile.drawx(), tile.drawy());
    }
});
changerturret.breakSound = Sounds.bang;
changerturret.bulletTimer = changerturret.timers++;
changerturret.entityType = prov(() => {
	const entity = extend(TileEntity, {
		getTicking: function(){
			return this._ticking;
		},
		setTicking: function(val){
			this._ticking = val;
		}
	});
	entity.setTicking(0);
	return entity;
});


/*
const elib = require("effectlib");
var placingabi = true;
var tickings = 0;
const changerBullet = extend(BasicBulletType, {
	hitTile: function(b, tile){
		this.hit(b);
		if(tile.entity != null){
			tile.setTeam(b.getTeam());
		};
	},
	draw(b){}
});
changerBullet.speed = 1;
changerBullet.damage = 0;
changerBullet.lifetime = 60;
changerBullet.hitEffect = Fx.none;
changerBullet.despawnEffect = Fx.none;
changerBullet.smokeEffect = Fx.none;
changerBullet.shootEffect = Fx.none;

const explosioneffectforthis = newEffect(20, e => {
	elib.outlineCircle(e.x, e.y, Color.valueOf("32f0ff"), e.fout() * 5, e.fin() * 60);
});
const changerturret = extendContent(Block, "changer", {
	onPlaced(){
		this.super$onPlaced();
		tickings = 0;
		this.bulletTimer.reset();
	},
	load(tile){
		this.animRegion = [];
		for(var i=0; i<7; i++){
			this.animRegion.push(Core.atlas.find(this.name + "-" + i));
		}
	},
	update(tile){
		print(tickings);
		placingabi = false;
		this.super$update(tile);
		entity = tile.ent();
		
		if(entity.timer.get(this.bulletTimer, 50)){
			if(tickings <= 4){
				Sounds.buttonClick.at(tile.drawx(), tile.drawy())
			};
			if(tickings >= 5){
				for(var i = 0; i < 721; i++){
            		Calls.createBullet(changerBullet, tile.getTeam(), tile.drawx(), tile.drawy(), i, Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0));
        		}
        		Effects.effect(explosioneffectforthis, tile.drawx(), tile.drawy(), 5);
        		tickings = 0;
        		placingabi = true;
        		tile.entity.kill();    		
			};

			if(tickings < 5){
				tickings = tickings + 1;
			};	
		};
	},
	onDestroyed(){},
	canPlaceOn(tile){
		return placingabi
	},
	draw(tile){
		Draw.rect(this.animRegion[tickings], tile.drawx(), tile.drawy());
	}
});
changerturret.breakSound = Sounds.bang;
changerturret.bulletTimer = changerturret.timers++;
*/