using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SunMoon : MonoBehaviour {
	Vector3 rotationPoint;
	// Use this for initialization
	void Start () {
		rotationPoint = new Vector3 (239,0,256);
	}
	
	// Update is called once per frame
	void Update () {
		transform.RotateAround (rotationPoint,Vector3.right,5f*Time.deltaTime);
		transform.LookAt (rotationPoint);
	}
}
