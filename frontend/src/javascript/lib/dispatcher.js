/*
 *	Basic dispatcher implementation
 *  Would be nice to use reflux instead...
 */
export class Dispatcher {
	constructor() {
		this.handlers = {};
	}

	on(type, fn) {
		if(!this.handlers){
			this.handlers = {};		
		}
		if (!this.handlers[type] || !Array.isArray(this.handlers[type])) {
			this.handlers[type] = [];
		}
		this.handlers[type].push(fn);
		return this;
	}

	off(type, fn) {
		if (!Array.isArray(this.handlers[type])) {
			return;
		}
		this.handlers.type = this.handlers[type].filter(
			function(item) {
				if (item !== fn) {
					return item;
				}
			}
		);
		return this;
	}

	trigger(type, payload) {
		if(this.handlers && this.handlers[type] && Array.isArray(this.handlers[type])){

			this.handlers[type].forEach(function(listener) {
				listener.call(this, payload);
			});
		}
		return this;
	}
}