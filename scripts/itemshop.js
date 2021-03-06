const scorelib = require("mindblow/itemscorelib");
function getBlock(name){
    return Vars.content.getByName(ContentType.block, name);
}
const itemshop = extendContent(Block, "itemshop", {
	init(){
		this.super$init();
		scorelib.loadItems();
	},
	load(){
		this.super$load();
		this.receiveFx = newEffect(20, e => {
			Draw.alpha(e.fin()+0.1);
			Draw.rect(e.data, e.x, e.y, e.fout()*20+8, e.fout()*20+8);
			Draw.reset();
		});

        if(Vars.data.isUnlocked(getBlock("mindblow-capup-3"))){
            this.itemCapacity = 900;
        } else if(Vars.data.isUnlocked(getBlock("mindblow-capup-2"))){
            this.itemCapacity = 700;
        } else if(Vars.data.isUnlocked(getBlock("mindblow-capup-1"))){
            this.itemCapacity = 500;
        }
        
	},
    setStats(){
        this.super$setStats();
        this.stats.remove(BlockStat.itemCapacity);
        if(Vars.data.isUnlocked(getBlock("mindblow-capup-3"))){
            this.stats.add(BlockStat.itemCapacity, 900, StatUnit.items);
        } else if(Vars.data.isUnlocked(getBlock("mindblow-capup-2"))){
            this.stats.add(BlockStat.itemCapacity, 700, StatUnit.items);
        } else if(Vars.data.isUnlocked(getBlock("mindblow-capup-1"))){
            this.stats.add(BlockStat.itemCapacity, 500, StatUnit.items);
        } else {
            this.stats.add(BlockStat.itemCapacity, 300, StatUnit.items);
        }
    },
	draw(tile){
		entity = tile.ent();
		this.super$draw(tile);
		var ang = Time.time()*2;
		var x1 = Angles.trnsx(ang, 0, 8 + Mathf.sinDeg(Time.time())*2);
		var y1 = Angles.trnsy(ang, 0, 8 + Mathf.sinDeg(Time.time())*2);
		var x2 = Angles.trnsx(ang, 0, -8 - Mathf.sinDeg(Time.time())*2);
		var y2 = Angles.trnsy(ang, 0, -8 - Mathf.sinDeg(Time.time())*2);
		var x3 = Angles.trnsx(ang, 8 + Mathf.sinDeg(Time.time())*2, 0);
		var y3 = Angles.trnsy(ang, 8 + Mathf.sinDeg(Time.time())*2, 0);
		var x4 = Angles.trnsx(ang, -8 - Mathf.sinDeg(Time.time())*2, 0);
		var y4 = Angles.trnsy(ang, -8 - Mathf.sinDeg(Time.time())*2, 0);
		var tx = tile.drawx();
		var ty = tile.drawy();
		
		Draw.rect("item-copper-small", tx + x1, ty + y1);
		Draw.rect("item-lead-small", tx + x2, ty + y2);
		Draw.rect("item-metaglass-small", tx + x3, ty + y3);
		Draw.rect("item-silicon-small", tx + x4, ty + y4);
		
	},
	buildConfiguration(tile, table){
		entity = tile.ent();
		var itemsel = Vars.content.items().get(0);
		var itemam = 0;
		table.addImageButton(Icon.box, run(()=>{
			const dialog = new FloatingDialog("Shop");
			dialog.setFillParent(/*false*/true);
			dialog.cont.table(cons(tb => {
				tb.center();
				tb.add("[accent]AnuCoins:[] " + entity.getAcoins());
				tb.addImage(Core.atlas.find("mindblow-routercoin")).size(24).padLeft(5);
			}));
			dialog.cont.row();
			dialog.cont.table(cons(tab => {
				tab.pane(cons(tb => {
					function itemButton(tb, i){
						var item = Vars.content.items().get(i)
						if(item == null) return;
						var price = Mathf.round(scorelib.scores().get(item))*20;
						tb.addButton(cons(t => {
							t.left();
							t.addImage(item.icon(Cicon.medium)).size(40).padRight(5);
							t.add(item.localizedName + "[accent] x20[]\nPrice: " + price + " [accent]AnuCoins[]");
						}), run(() => {
							if(entity.getAcoins()>=price&&entity.items.total()+20<=tile.block().itemCapacity){
								Vars.ui.showConfirm("Confirm Your Purchase", "Are you sure you want to buy [accent]" + item.localizedName + " x20[]\nFor " + price + " [accent]AnuCoins[]?", run(()=>{
									entity.setAcoins(entity.getAcoins()-price);
									entity.items.add(item, 20);
									dialog.hide();
									Vars.ui.showInfoToast("[accent]Thanks for your purchase![]\nThe items are inside the shop.\nUse unloaders to get them.", 5);
								}));
							} else {
                                if(entity.items.total()+20>tile.block().itemCapacity){
                                    Vars.ui.showErrorMessage("Theres not enough space in the shop right now.")
                                } else {
								    Vars.ui.showErrorMessage("Not Enough AnuCoins");
                                }
							}
						})).growX();
					
						tb.row();
					}
					for(i = 0; i < Vars.content.items().size; i++){
						itemButton(tb, i);
						/*var item = Vars.content.items().get(i)
						if(item == null) continue;
						var price = Mathf.round(scorelib.scores().get(item))*20;
						tb.addButton(cons(t => {
							t.left();
							t.addImage(item.icon(Cicon.medium)).size(40).padRight(5);
							t.add(item.localizedName + "[accent] x20[]\nPrice: " + price + " [accent]AnuCoins[]");
						}), run(() => {
							//nothing
						})).growX();
						tb.row();*/
                        //hhh
					};
				})).growX()/*.width(Core.graphics.width/3).height(Core.graphics.height*0.8)*/;
				if(Vars.mobile){
					tab.row();
					tab.add("").padTop(5).padBottom(5);
					tab.row();
				}
                if(Vars.data.isUnlocked(getBlock("mindblow-unitup"))){
				    tab.pane(cons(tb => {
					   var units = Vars.content.units();
					   var unlist = [];
					   function summonButton(tb, i){
						  var unit = units.get(i)
						  if(unit == null) return;
						  unlist.push(unit);
						  var price = unit.getMindblowPrice==undefined?Mathf.round(unit.health+unit.weapon.bullet.damage*50):unit.getMindblowPrice();
						  tb.addButton(cons(t => {
							 t.left();
							 t.addImage(unit.icon(Cicon.medium)).size(40).padRight(5);
							 t.add(unit.localizedName + "\nPrice: " + price + " [accent]AnuCoins[]");
						  }), run(() => {
						  	 if(entity.getAcoins()>=price){
								    Vars.ui.showConfirm("Confirm Your Purchase", "Are you sure you want to buy [accent]" + unit.localizedName + "[]\nFor " + price + " [accent]AnuCoins[]?", run(()=>{
									   entity.setAcoins(entity.getAcoins()-price);
									   var un = unit.create(tile.getTeam());
									   var rnd = Mathf.random()*360;
									   var x = tile.drawx() + Angles.trnsx(rnd, 0, 5);
									   var y = tile.drawy() + Angles.trnsy(rnd, 0, 5);
									   un.set(x, y);
									   un.add();
									   dialog.hide();
									   Vars.ui.showInfoToast("[accent]Thanks for your purchase![]", 5);
								    }));
							 } else {
							 	Vars.ui.showErrorMessage("Not Enough AnuCoins");
							 }
						  })).growX();
					
						  tb.row();
					   }
					   for(i = 0; i < units.size; i++){
						  summonButton(tb, i);
					   };
				    })).growX()/*height(Core.graphics.height*0.8)*/;
                }
			}));
			dialog.cont.row();
			dialog.addCloseButton();
			dialog.cont.table(cons(tb=> {
				/*tb.addButton(cons(t => {
					t.center();
					t.add("Back");
				}), run(() => {
					dialog.hide();
				}));*/
				tb.addButton(cons(t => {
					t.center();
					t.add("Sell Items");
				}), run(() => {
					function buildSell(){
						const sdialog = new FloatingDialog("Sell Items");
						var core = Vars.state.teams.get(Vars.player.getTeam()).cores.first();
						
							sdialog.setFillParent(false);
							sdialog.center();
							sdialog.cont.table(cons(tb => {
							tb.center();
                            var textarea = new TextArea(itemam);
							tb.table(cons(tb => {
                            tb.addButton(cons(t => {
								t.center();
								t.addImage(itemsel.icon(Cicon.medium)).size(48);
							}), run(() => {
								const isdialog = new FloatingDialog("Select Item");
								isdialog.setFillParent(true);
								function itemSelectButton(tb, i){
									var item = Vars.content.items().get(i)
									if(item == null) return;
									tb.addButton(cons(t => {
										t.left();
										t.addImage(item.icon(Cicon.medium)).size(40).padRight(5);
										t.add(item.localizedName);
									}), run(() => {
										itemsel = item;
										isdialog.hide();
										sdialog.hide();
										buildSell();
									})).growX();
									tb.row();
								}
								isdialog.cont.pane(cons(tb => {
									for(i = 0; i < Vars.content.items().size; i++){
                                        if(Vars.content.items().get(i).type == ItemType.material){
										  itemSelectButton(tb, i);
                                        }
									};
								})).growX().width(Core.graphics.width/3);
								isdialog.row();
								isdialog.addCloseButton();
								isdialog.show();
							})).padRight(5);
							
							tb.addButton(cons(t => {
								t.left();
								t.addImage(Core.atlas.find("mindblow-minus-icon")).size(32);
							}), run(() => {
                                    if(itemam>0){
								        itemam+=-1;
                                        textarea.setText(itemam);
                                    }
							})).growX().height(60).width(60);
							tb.add(textarea);
							tb.addButton(cons(t => {
								t.left();
								t.addImage(Core.atlas.find("mindblow-plus-icon")).size(32);
							}), run(() => {
								itemam++;
                                    textarea.setText(itemam);
							})).growX().height(60).width(60);
                            }));
							tb.row();
							tb.center();
                            tb.table(cons(tb=>{
							tb.addButton(cons(t => {
								t.center();
								t.add("Sell");
							}), run(() => {
								if(!isNaN(textarea.getText())&&textarea.getText()>0){
									itemam = textarea.getText();
									var price = Mathf.round((Mathf.round(scorelib.scores().get(itemsel))*0.8)*itemam);
									if(core.items.has(itemsel, itemam)&&core.items.get(itemsel)>0){
									Vars.ui.showConfirm("Sell Confirmation", "Are you sure you want to sell [accent]" + itemam + " " + itemsel.localizedName + "[]\nFor " + price + " [accent]AnuCoins[]?", run(()=>{
									core.items.remove(itemsel, itemam);
										entity.setAcoins(entity.getAcoins()+price);
										sdialog.hide();
										dialog.hide();
										Vars.ui.showInfoToast("[accent]Thank you![]", 5);
									}));
									} else {
									if(core.items.get(itemsel)>0){
										Vars.ui.showErrorMessage("There is not enough [accent]" + itemsel.localizedName + "[] on the core.\nThere is only: " + core.items.get(itemsel));
									} else {
										Vars.ui.showErrorMessage("There is no [accent]" + itemsel.localizedName + "[] on the core.");
									}
								}
                                } else {
                                    itemam = 0;
                                    textarea.setText(itemam);
                                    Vars.ui.showErrorMessage("Not a valid number!");
                                }
							})).growX().width(150);
							tb.addButton(cons(t => {
								t.center();
								t.add("Sell All");
							}), run(() => {
								itemam = core.items.get(itemsel);
								var price = Mathf.round((Mathf.round(scorelib.scores().get(itemsel))*0.8)*itemam);
								if(core.items.get(itemsel)>0){
									Vars.ui.showConfirm("Sell Confirmation", "Are you sure you want to sell [accent]" + itemam + " " + itemsel.localizedName + "[]\nFor " + price + " [accent]AnuCoins[]?", run(()=>{
										core.items.remove(itemsel, itemam);
										entity.setAcoins(entity.getAcoins()+price);
										sdialog.hide();
										dialog.hide();
										Vars.ui.showInfoToast("[accent]Thank you![]", 5);
									}));
								} else {
									Vars.ui.showErrorMessage("There is no [accent]" + itemsel.localizedName + "[] on the core.");
								}
							})).growX().width(150);
                            }));
						}));
						sdialog.row();
						sdialog.addCloseButton();
						sdialog.show();
					}
					buildSell();
				}));
			}));
			
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
		},
        	write(stream){
            		this.super$write(stream);
            		stream.writeInt(this._aco == null ? 0 : Math.round(this._aco));
        	},
        	read(stream,revision){
            		this.super$read(stream,revision);
            		this._aco = stream.readInt();
        	}
	});
	
	if(entity._aco == null) entity.setAcoins(0);
	
	return entity;
});
itemshop.fxtimer = itemshop.timers++;
