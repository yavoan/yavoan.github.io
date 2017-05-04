using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Weapons : MonoBehaviour {
	public Rigidbody spearPrefab;
	public float throwSpeed = 80.0f;
	public static int maxSpear;
	// Use this for initialization
	void Start () {
		maxSpear = 20;
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.GetButtonDown("Fire1") && maxSpear>0){
			maxSpear--;
			Rigidbody newSpear = Instantiate(spearPrefab,
				transform.position, transform.rotation) as Rigidbody;
			newSpear.name = "spear";
			newSpear.velocity = (transform.right * throwSpeed);
		}
	}
}
