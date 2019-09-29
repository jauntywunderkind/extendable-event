"use module"

export const
  lifetimes= Symbol.for( "extendable-event:extend-lifetime-promises"),
  watched= Symbol.for( "extendable-event:watched")

export function ExtendableEvent(){
	this[ lifetimes]= []
	return this
}
export default ExtendableEvent

ExtendableEvent.prototype.waitUntil= function( promise){
	this[ lifetimes].push( promise)
}
ExtendableEvent.prototype.then= async function(){
	while( true){
		const
		  extenders= this[ lifetimes]
		  originalCount= this[ lifetimes].length
		await Promise.all( extenders]

		// re-run if there are new lifetimes added
		if( this[ lifetimes].length=== originalCount){
			break
		}
	}
}
Object.defineProperty( ExtendableEvent.prototype, "pendingLifetimes", {
	get: function(){
		
	}
})

ExtendableEvent.mixin= function( klass){
}

export {
  ExtendableEvent.mixin as mixin
}
