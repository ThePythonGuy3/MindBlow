const scorelib = require("mindblow/itemscorelib");
const itemshop = extendContent(Block, "itemshop", {
	init(){
		this.super$init();
		scorelib.loadItems();
	},
	load(){
		this.region = Core.atlas.find(this.name + "-icon");
		this.animRegions = [];
		for(i = 0; i <= 11; i++){
			this.animRegions.push(Core.atlas.find(this.name + "-" + i));
		};
		this.regCount = 0;
		this.baseRegion = Core.atlas.find(this.name + "-base");
	},
	draw(tile){
        var tile = Vars.world.ltileWorld(Vars.control.input.getMouseX(), Vars.control.input.getMouseY());
		if(tile != null && tile.block() == this && tile.getTeam() == Vars.player.getTeam()){
			this.regCount += 0.001;
			if(this.regCount>10){
				this.regCount = 11;
			};
		} else {
			this.regCount += -0.001;
			if(this.regCount<1){
				this.regCount = 0;
			};
		}
		Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());
		Draw.rect(this.animRegions[Mathf.round(this.regCount)], tile.drawx(), tile.drawy());
	},
	buildConfiguration(tile, table){
		
		table.addImageButton(Icon.box, Styles.clearTransi, run(()=>{
			const dialog = new FloatingDialog("Item Shop");
			dialog.setFillParent(false);
			dialog.cont.add("[accent]AnuCoins:[] " + tile.ent().getAcoins());
			dialog.cont.row();
			dialog.cont.pane(cons(tb => {
				for(i = 0; i < Vars.content.items().size; i++){
					var item = Vars.content.items().get(i)
					if(item == null) continue;
					var price = Mathf.round(scorelib.scores().get(item))*20;
					tb.addImageTextButton(item.localizedName + "[accent] x20[]\nPrice: " + price + " [accent]AnuCoins[]",  new TextureRegionDrawable(item.icon(Cicon.large)), run(()=>{
						//nothing
					})).growX();
					
					tb.row();
				};
			})).growX().width(Core.graphics.width/3).height(Core.graphics.height*0.8);
			dialog.addCloseButton();
			dialog.show();
		}));	
	}
});
itemshop.entityType = prov(() => {
	const entity = extend(TileEntity, {
		getAcoins: function(){
			return this._aco;
		},
		setAcoins: function(val){
			this._aco = val;
		}
	});
	entity.setAcoins(0);
	return entity;
});