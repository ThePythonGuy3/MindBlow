if(!this.global.cusSounds){
  this.global.cusSounds = {};
}

var t = this;

function loadsound(name){
  if(t.global.cusSounds[name] !== undefined && t.global.cusSounds[name] !== null && t.global.cusSounds[name] != Sounds.none) return;
  try{
    (Core.assets.load("sounds/"+ name +".ogg", Packages.arc.audio.Sound)).loaded = cons(a => {
      try{
        t.global.cusSounds[name] = a;
        print("Loaded sound: "+name);
      }
      catch(err){
        t.global.cusSounds[name] = Sounds.none;
        print("Failed to load sound!");
        print(err);
      }
    });
  }
  catch(err){
    t.global.cusSounds[name] = Sounds.none;
    print("Failed to load sound!");
    print(err);
  }
  if(!t.global.cusSounds[name]){
    t.global.cusSounds[name] = Sounds.none;
    //print("Failed to load sound! Please restart the game!");
  }
}

loadsound("astrocharge");