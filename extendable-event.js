"use module"

export const
  $lifetimes= Symbol.for( "extendable-event:extend-lifetime-promises"),
  // these are all for "pendingCount":
  $watched= Symbol.for( "extendable-event:watched"),
  $resolved= Symbol.for( "extendable-event:resolved"),
  $watcher= Symbol.for( "extendable-event:watcher")

export function ExtendableEvent(){
	this[ $lifetimes]= []
	return this
}
if( typeof CustomEvent!== "undefined"){
	ExtendableEvent.prototype= CustomEvent
	ExtendableEvent.prototype.constructor= ExtendableEvent
}
export default ExtendableEvent

ExtendableEvent.prototype.waitUntil= function( promise){
	this[ $lifetimes].push( promise)
}
ExtendableEvent.prototype.then= async function(){
	while( true){
		const
		  extenders= this[ $lifetimes]
		  originalCount= this[ $lifetimes].length
		await Promise.all( this[ $lifetimes])

		// re-run if there are new lifetimes added
		if( this[ $lifetimes].length=== originalCount){
			break
		}
	}
}
ExtendableEvent.prototype.pendingCount= async function(){
	const watcher= this[ $watcher]|| (this[ $watcher]= ()=> ++this[ $resolved])
	for( let i= this[ $watched]|| 0; i< this[ $lifetimes].length; ++i){
		this[ $lifetimes].then( watcher)
	}
	this[ $watched]= this[ $lifetimes].length= 0
	await delay()
	return this[ $lifetimes].length- this[ $resolved]
}

ExtendableEvent.mixin= function( klass){
}

export {
  ExtendableEvent.mixin as mixin
}
