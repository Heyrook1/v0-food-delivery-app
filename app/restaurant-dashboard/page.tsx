import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Utensils, ListOrdered, PlusCircle } from "lucide-react"

export default function RestaurantDashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Restaurant Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListOrdered className="h-5 w-5" /> Manage Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">View and manage incoming and past orders.</p>
            <Button className="w-full bg-appRed hover:bg-red-600">View Orders</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" /> Manage Menu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Add, edit, or remove menu items.</p>
            <Button className="w-full bg-appRed hover:bg-red-600">Edit Menu</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" /> Add New Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Quickly add a new dish to your menu.</p>
            <Button className="w-full bg-appRed hover:bg-red-600">Add Item</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
