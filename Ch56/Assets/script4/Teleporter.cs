using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Teleporter : MonoBehaviour {
	public GameObject destination;
	// Use this for initialization
	public float t;
	void Start () {
		t = 0f;
	}
	
	// Update is called once per frame
	void Update () {
		
	}
	void OnTriggerEnter(Collider c){
		if (c.tag == "Player" && !Player.teleRecently) {
			c.transform.position = destination.transform.position;
			Player.teleRecently = true;
		}
	}
}
	
