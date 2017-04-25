using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TextHints : MonoBehaviour {
	float timer = 0.0f;
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		if(GetComponent<GUIText>().enabled){
			timer += Time.deltaTime;
			if (timer >= 4) {
				GetComponent<GUIText> ().enabled = false;
				timer = 0.0f;
			}
		}
	}
	void ShowHint(string message){
		GetComponent<GUIText> ().text = message;
		if (!GetComponent<GUIText> ().enabled) {
			GetComponent<GUIText> ().enabled = true;
		}
	}
}
