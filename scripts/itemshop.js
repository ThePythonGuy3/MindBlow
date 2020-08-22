const scorelib = require("mindblow/itemscorelib");
const itemshop = extendContent(Block, "itemshop", {
	init(){
		this.super$init();
		scorelib.loadItems();
	},
	load(){
		this.super$load();
		this.itemFx = newEffect(20, e => {
			Draw.color(Color.valueOf("ff0000").shiftHue(Time.time()));
			Fill.circle(e.x, e.y, e.fout()*2);
			Draw.color();
		});
	},
	draw(tile){
		entity = tile.ent();
		this.super$draw(tile);
		var ang = Time.time()*2+Mathf.sinDeg(Time.time())*20;
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
		/*Effects.effect(this.itemFx, tx + x1, ty + y1);
		Effects.effect(this.itemFx, tx + x2, ty + y2);
		Effects.effect(this.itemFx, tx + x3, ty + y3);
		Effects.effect(this.itemFx, tx + x4, ty + y4);*/
		
		Draw.rect("item-copper-small", tx + x1, ty + y1);
		Draw.rect("item-lead-small", tx + x2, ty + y2);
		Draw.rect("item-metaglass-small", tx + x3, ty + y3);
		Draw.rect("item-silicon-small", tx + x4, ty + y4);
		
	},
	buildConfiguration(tile, table){
		entity = tile.ent();
		var itemsel = Vars.content.items().get(0);
        var itemam = 0;
		table.addImageButton(Icon.box, Styles.clearTransi, run(()=>{
			const dialog = new FloatingDialog("Item Shop");
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
                        	if(entity.getAcoins()>=price){
                        		Vars.ui.showConfirm("Confirm Your Purchase", "Are you sure you want to buy [accent]" + item.localizedName + " x20[]\nFor " + price + " [accent]AnuCoins[]?", run(()=>{
                            		entity.setAcoins(entity.getAcoins()-price);
                            		entity.items.add(item, 20);
                            		dialog.hide();
                            		Vars.ui.showInfoToast("[accent]Thanks for your purchase![]\nThe items are inside the shop. Use unloaders to get them.", 5);
                            	}));
                        	} else {
                        		Vars.ui.showErrorMessage("Not Enough AnuCoins");
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
					};
				})).growX()/*.width(Core.graphics.width/3).height(Core.graphics.height*0.8)*/;
				if(Vars.mobile){
					tab.row();
				}
				tab.pane(cons(tb => {
					var units = Vars.content.units();
					var unlist = [];
					function summonButton(tb, i){
						var unit = units.get(i)
                        if(unit == null) return;
                        unlist.push(unit);
                        var price = Mathf.round(unit.health+unit.weapon.bullet.damage*50);
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
                            		var x = tile.drawx() + Angles.trnsx(rnd, 0, 20);
                            		var y = tile.drawy() + Angles.trnsy(rnd, 0, 20);
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
				})).growX()/*.width(Core.graphics.width/3).height(Core.graphics.height*0.8)*/;
			}));
			dialog.cont.row();
			dialog.cont.table(cons(tb=> {
				tb.addButton(cons(t => {
					t.center();
					t.add("Back");
                }), run(() => {
                	dialog.hide();
                }));
                tb.addButton(cons(t => {
					t.center();
					t.add("Sell Items");
                }), run(() => {
                	function buildSell(){
                		const sdialog = new FloatingDialog("Sell Items");
                		var core = Vars.state.teams.get(Vars.player.getTeam()).cores.first();
                		
                		sdialog.setFillParent(false);
                		sdialog.cont.table(cons(tb => {
                			tb.addButton(cons(t => {
                				t.center();
                				t.addImage(itemsel.icon(Cicon.medium)).size(48);
                			}), run(() => {
                				const isdialog = new FloatingDialog("Select Item");
                				isdialog.setFillParent(false);
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
										itemSelectButton(tb, i);
									};
								})).growX().height(Core.graphics.height*0.6);
								isdialog.row();
								isdialog.addCloseButton();
								isdialog.show();
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
		}
	});
	entity.setAcoins(0);
	return entity;
});
itemshop.fxtimer = itemshop.timers++;