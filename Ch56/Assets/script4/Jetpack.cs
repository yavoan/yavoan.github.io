﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Jetpack : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}
	void OnTriggerEnter(Collider c){
		if (c.tag == "Player") {
			Player.canFly = true;
			Destroy (gameObject);
		}
	}
}
