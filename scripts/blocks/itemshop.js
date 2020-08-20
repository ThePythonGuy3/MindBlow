const itemshop = extendContent(Block, "itemshop", {
	canBreak(){
		return false;
	},
	configured(){
		const dialog = new FloatingDialog("Item Shop");
		dialog.setFillParent(false);
		dialog.cont.pane(cons(table => {
			for(i = 0; i < Vars.content.items().size; i++){
				var item = Vars.content.items().get(i)
				if(item == null) continue;
				var prize = item.hardness*item.cost;
				table.addImageTextButton(item.localizedName + "\nPrize: " + prize, item.icon(Cicon.large),run(()=>{
					//nothing
				}));
				table.row();
			};
		}));	
	}
});