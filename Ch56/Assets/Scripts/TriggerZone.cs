using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TriggerZone : MonoBehaviour {
	public Light doorLight;
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}
	public AudioClip lockedSound;
	public GUIText textHints;
	//pg 199
	void OnTriggerEnter(Collider col){
		if (col.gameObject.tag == "Player") {
			if (Inventory.charge == 4) {
				transform.FindChild ("door").SendMessage ("DoorCheck");
				if (GameObject.Find ("PowerGUI")) {
					Destroy (GameObject.Find ("PowerGUI"));
					doorLight.color = Color.green;
				}
			} else if (Inventory.charge > 0 && Inventory.charge < 4) {
				textHints.SendMessage ("ShowHint", "This door won't budge.. guess it needs full charging maybe more power");
				transform.FindChild ("door").GetComponent<AudioSource> ().PlayOneShot (lockedSound);
			} else {
				transform.FindChild ("door").GetComponent<AudioSource> ().PlayOneShot (lockedSound);
				col.gameObject.SendMessage ("HUDon");
				textHints.SendMessage ("ShowHint","The door is locked.. maybe the generator needs power");
			}
		}
	}
}
