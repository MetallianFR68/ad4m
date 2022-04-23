export default class common_sensors
{
	constructor(tab)
	{
		this.id = 'common-sensors'
		this.tab = tab
		this.updating = true
		this.heartbeat = document.getElementById('sensors_0_heartbeat_icon')
	}

	update()
	{
		if (current_tab != this.tab.id || this.updating == false)
			return true
		
		this.heartbeat.classList.toggle('has-text-danger')
		
		fetch(this.tab.url +'/sensors_update.php')
		.then(response => response.json())
		.then(response => 
		{
			if (response)
			{
				for (let device of response)
				{
					if (!window[this.tab.id].devices.find(item => item.id == device.id))
					{
						bulmaToast.toast({message: 'New sensor detected<br/>' + device.id, type: 'is-info', position: 'bottom-right', duration: 5000, dismissible: true, pauseOnHover: true})
					}
						
					device = {...device, ...window[this.tab.id].devices.find(item => item.id == device.id)}
					if (window[this.tab.id][device.id]['update'])
						window[this.tab.id][device.id]['update'](device.values)
				}
				window[this.tab.id][this.id].update()
			}
		})
		.catch(error =>
		{
			this.heartbeat.classList.remove('has-text-danger');
			this.heartbeat.classList.remove('fa-heart-pulse')
			bulmaToast.toast({message: 'Error updating sensors<br/>' + error.toString(), type: 'is-warning', position: 'bottom-right', duration: 5000, dismissible: true, pauseOnHover: true})
		})
	}

	update_toggle()
	{
		this.heartbeat.classList.remove('has-text-danger');
		this.heartbeat.classList.toggle('fa-heart-pulse'); 
		this.updating = !this.updating
		this.update()
	}
}