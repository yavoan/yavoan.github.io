using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class inven2 : MonoBehaviour {
	public static int charge = 0;
	//public AudioClip collectSound;

	// Use this for initialization
	void Start () {
		charge = 0;
	}
	
	// Update is called once per frame
	void Update () {
		GameObject.Find ("Text").GetComponent<Text>().text = "Heads: " + charge;
		GetComponent<Rigidbody>().velocity = Vector3.zero;
	}
	void HeadPickup(){
		charge++;
	}
}
