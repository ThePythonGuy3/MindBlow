const itemshop = extendContent(Block, "itemshop", {
	canBreak(){
		return false;
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
			dialog.cont.pane(cons(table => {
				for(i = 0; i < Vars.content.items().size; i++){
					var item = Vars.content.items().get(i)
					if(item == null) continue;
					var price = item.hardness*item.cost;
					table.addImageTextButton(item.localizedName + "\nPrice: " + price + "[accent]AnuCoins[]", item.icon(Cicon.large),run(()=>{
						//nothing
					}));
					table.row();
				};
			}));
			dialog.show();
		}));	
	}
});