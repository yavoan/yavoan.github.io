using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ThrowTrigger : MonoBehaviour {
	public Canvas crosshair;
	public GUIText textHints;
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}
	void OnTriggerEnter(Collider col){
		if(col.gameObject.tag == "Player"){
			CoconutThrower.canThrow=true;
			crosshair.enabled = true;

			if(!CoconutWin.haveWon){
				textHints.SendMessage("ShowHint",
					"\n\n\n\n\n There's a power cell attached to this game, \n maybe I'll win it if I can knock down all the targets...");
			}
		}
	}
	void OnTriggerExit(Collider col){
		if(col.gameObject.tag == "Player"){
			CoconutThrower.canThrow=false;
			crosshair.enabled = false;
		}
	}
}
